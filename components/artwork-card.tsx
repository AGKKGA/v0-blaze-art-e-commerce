import Link from "next/link"
import Image from "next/image"
import type { Artwork } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link
      href={`/artwork/${artwork.id}`}
      className="group relative flex flex-col overflow-hidden bg-card transition-all hover:ring-1 hover:ring-primary/30"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={artwork.watermarked_url || "/placeholder.svg"}
          alt={artwork.title}
          width={400}
          height={533}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Type badge */}
        <div className="absolute left-3 top-3">
          <Badge
            variant="secondary"
            className="rounded-none border-none bg-background/80 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm"
          >
            {artwork.type}
          </Badge>
        </div>
        {/* Stock info for physical */}
        {artwork.type === "physical" && artwork.stock_quantity !== null && artwork.stock_quantity <= 3 && (
          <div className="absolute bottom-3 right-3">
            <Badge className="rounded-none border-none bg-primary text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              {artwork.stock_quantity === 0
                ? "Sold Out"
                : `Only ${artwork.stock_quantity} left`}
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          {artwork.category}
        </p>
        <h3 className="mt-1 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {artwork.title}
        </h3>
        <p className="mt-auto pt-2 text-sm font-medium text-muted-foreground">
          ${Number(artwork.price).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}
