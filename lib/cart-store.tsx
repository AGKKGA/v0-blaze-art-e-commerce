"use client"

import React from "react"

import { createContext, useContext, useCallback, useSyncExternalStore } from "react"
import type { Artwork, CartItem } from "@/lib/types"

// ---- tiny external store (SSR-safe via useSyncExternalStore) ----

let items: CartItem[] = []
let listeners: Array<() => void> = []

function emitChange() {
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getSnapshot() {
  return items
}

// Cache the server snapshot to avoid infinite loop in React 19
const emptyServerSnapshot: CartItem[] = []
function getServerSnapshot(): CartItem[] {
  return emptyServerSnapshot
}

// ---- public actions ----

function addItem(artwork: Artwork, qty = 1) {
  const existing = items.find((i) => i.artwork.id === artwork.id)
  if (existing) {
    items = items.map((i) =>
      i.artwork.id === artwork.id ? { ...i, quantity: i.quantity + qty } : i,
    )
  } else {
    items = [...items, { artwork, quantity: qty }]
  }
  emitChange()
}

function removeItem(artworkId: string) {
  items = items.filter((i) => i.artwork.id !== artworkId)
  emitChange()
}

function updateQuantity(artworkId: string, quantity: number) {
  if (quantity <= 0) {
    removeItem(artworkId)
    return
  }
  items = items.map((i) =>
    i.artwork.id === artworkId ? { ...i, quantity } : i,
  )
  emitChange()
}

function clearCart() {
  items = []
  emitChange()
}

// ---- Context ----

interface CartContextValue {
  items: CartItem[]
  addItem: (artwork: Artwork, qty?: number) => void
  removeItem: (artworkId: string) => void
  updateQuantity: (artworkId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartItems = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + Number(i.artwork.price) * i.quantity,
    0,
  )

  const value: CartContextValue = {
    items: cartItems,
    addItem: useCallback((artwork: Artwork, qty?: number) => addItem(artwork, qty), []),
    removeItem: useCallback((id: string) => removeItem(id), []),
    updateQuantity: useCallback((id: string, q: number) => updateQuantity(id, q), []),
    clearCart: useCallback(() => clearCart(), []),
    totalItems,
    totalPrice,
  }

  return <CartContext value={value}>{children}</CartContext>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be inside CartProvider")
  return ctx
}
