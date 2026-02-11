import { Suspense } from "react"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import type { Artwork } from "@/lib/types"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GalleryFilters } from "@/components/gallery-filters"
import { ArtworkCard } from "@/components/artwork-card"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Gallery | Blaze Art",
  description: "Browse original paintings, digital art, and custom logos by Yousuf.",
}

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string
    type?: string
    sort?: string
  }>
}

async function ArtworkGrid({ searchParams }: { searchParams: Awaited<GalleryPageProps["searchParams"]> }) {
  const supabase = await createClient()

  let query = supabase.from("artworks").select("*").eq("is_active", true)

  if (searchParams.category && searchParams.category !== "All") {
    query = query.eq("category", searchParams.category)
  }

  if (searchParams.type && searchParams.type !== "All") {
    query = query.eq("type", searchParams.type.toLowerCase())
  }

  switch (searchParams.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true })
      break
    case "price_desc":
      query = query.order("price", { ascending: false })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data: artworks } = await query

  if (!artworks || artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-xl text-foreground">No artworks found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters to find what you are looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(artworks as Artwork[]).map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  )
}

function ArtworkGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <Skeleton className="aspect-[3/4] w-full" />
          <div className="p-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-2 h-5 w-3/4" />
            <Skeleton className="mt-3 h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function GalleryPage(props: GalleryPageProps) {
  const searchParams = await props.searchParams

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Full Collection
            </span>
            <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Gallery
            </h1>
          </div>

          {/* Filters */}
          <div className="mb-10">
            <Suspense fallback={null}>
              <GalleryFilters />
            </Suspense>
          </div>

          {/* Grid */}
          <Suspense fallback={<ArtworkGridSkeleton />}>
            <ArtworkGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
