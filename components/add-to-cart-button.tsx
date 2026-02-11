"use client"

import { ShoppingBag, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-store"
import type { Artwork } from "@/lib/types"
import { Button } from "@/components/ui/button"

export function AddToCartButton({ artwork }: { artwork: Artwork }) {
  const { addItem, items } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const alreadyInCart = items.some((i) => i.artwork.id === artwork.id)
  const soldOut =
    artwork.type === "physical" &&
    artwork.stock_quantity !== null &&
    artwork.stock_quantity <= 0

  function handleAdd() {
    addItem(artwork)
    setJustAdded(true)
    toast.success(`${artwork.title} added to cart`)
    setTimeout(() => setJustAdded(false), 2000)
  }

  if (soldOut) {
    return (
      <Button
        disabled
        size="lg"
        className="w-full rounded-none text-sm font-semibold uppercase tracking-wider"
      >
        Sold Out
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAdd}
      size="lg"
      className="w-full gap-2 rounded-none text-sm font-semibold uppercase tracking-wider"
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          {alreadyInCart ? "Add Another" : "Add to Cart"}
        </>
      )}
    </Button>
  )
}
