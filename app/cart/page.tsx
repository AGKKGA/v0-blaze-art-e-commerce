"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-24">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mt-6 font-serif text-2xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Discover something beautiful in the gallery.
          </p>
          <Button asChild className="mt-8 gap-2 rounded-none px-8 text-sm font-semibold uppercase tracking-wider">
            <Link href="/gallery">
              Browse Gallery
            </Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="mb-10 font-serif text-3xl font-bold text-foreground">
            Shopping Cart
          </h1>

          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.artwork.id}>
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <Link href={`/artwork/${item.artwork.id}`} className="shrink-0">
                    <div className="relative h-28 w-20 overflow-hidden bg-card">
                      <Image
                        src={item.artwork.watermarked_url || "/placeholder.svg"}
                        alt={item.artwork.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                        {item.artwork.category}
                      </p>
                      <Link href={`/artwork/${item.artwork.id}`}>
                        <h3 className="font-serif text-lg font-semibold text-foreground hover:text-primary">
                          {item.artwork.title}
                        </h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.artwork.type === "digital" ? "Digital Download" : "Physical"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-serif text-lg font-semibold text-foreground">
                      ${(Number(item.artwork.price) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.artwork.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove {item.artwork.title}</span>
                    </button>
                  </div>
                </div>
                <Separator className="mt-6 bg-border/40" />
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Total
              </span>
              <span className="font-serif text-2xl font-bold text-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              className="mt-4 w-full gap-2 rounded-none text-sm font-semibold uppercase tracking-wider"
              disabled
            >
              Checkout (Coming Soon)
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Stripe checkout integration will be connected in a future update.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
