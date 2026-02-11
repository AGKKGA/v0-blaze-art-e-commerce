import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Download, Package } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Artwork } from "@/lib/types"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ArtworkPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: ArtworkPageProps): Promise<Metadata> {
  const { id } = await props.params
  const supabase = await createClient()
  const { data: artwork } = await supabase
    .from("artworks")
    .select("title, description")
    .eq("id", id)
    .single()

  if (!artwork) return { title: "Artwork Not Found" }

  return {
    title: `${artwork.title} | Blaze Art`,
    description: artwork.description || undefined,
  }
}

export default async function ArtworkPage(props: ArtworkPageProps) {
  const { id } = await props.params
  const supabase = await createClient()
  const { data } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (!data) notFound()

  const artwork = data as Artwork

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Back link */}
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>

          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Image */}
            <div className="flex-1">
              <div className="relative aspect-square overflow-hidden bg-card lg:aspect-[4/5]">
                <Image
                  src={artwork.watermarked_url || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col lg:w-[400px] lg:shrink-0">
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-none border-none bg-secondary text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground"
                >
                  {artwork.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-none text-[10px] font-semibold uppercase tracking-wider"
                >
                  {artwork.type === "digital" ? (
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> Digital
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" /> Physical
                    </span>
                  )}
                </Badge>
              </div>

              <h1 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
                {artwork.title}
              </h1>

              <p className="mt-2 font-serif text-2xl font-semibold text-primary">
                ${Number(artwork.price).toFixed(2)}
              </p>

              {artwork.type === "physical" && artwork.stock_quantity !== null && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {artwork.stock_quantity === 0
                    ? "Currently sold out"
                    : `${artwork.stock_quantity} remaining`}
                </p>
              )}

              <Separator className="my-6 bg-border/40" />

              <p className="leading-relaxed text-muted-foreground">
                {artwork.description}
              </p>

              <Separator className="my-6 bg-border/40" />

              {/* Type-specific info */}
              <div className="mb-6 text-sm text-muted-foreground">
                {artwork.type === "digital" ? (
                  <p>
                    Instant download after purchase. High-resolution files
                    delivered to your email.
                  </p>
                ) : (
                  <p>
                    Ships within 5-7 business days. Carefully packaged to
                    ensure safe delivery worldwide.
                  </p>
                )}
              </div>

              <AddToCartButton artwork={artwork} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
