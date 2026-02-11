import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Artwork } from "@/lib/types"
import { Button } from "@/components/ui/button"

export async function FeaturedArtworks() {
  const supabase = await createClient()
  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4)

  if (!artworks || artworks.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Curated Selection
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Featured Works
          </h2>
        </div>
        <Button
          asChild
          variant="ghost"
          className="hidden gap-2 text-sm text-muted-foreground hover:text-primary md:flex"
        >
          <Link href="/gallery">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(artworks as Artwork[]).map((artwork) => (
          <Link
            key={artwork.id}
            href={`/artwork/${artwork.id}`}
            className="group relative overflow-hidden bg-card"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <Image
                src={artwork.watermarked_url || "/placeholder.svg"}
                alt={artwork.title}
                width={400}
                height={533}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {artwork.category}
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {artwork.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                ${Number(artwork.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Button asChild variant="outline" className="gap-2 rounded-none border-border bg-transparent text-foreground hover:border-primary hover:text-primary">
          <Link href="/gallery">
            View All Works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
