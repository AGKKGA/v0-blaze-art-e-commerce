import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About | Blaze Art",
  description: "Learn about Yousuf, the artist behind Blaze Art, based in Northern Cyprus.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-24 lg:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            The Artist
          </span>
          <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
            About Blaze Art
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Northern Cyprus
          </div>

          <div className="mt-10 flex flex-col gap-6 text-muted-foreground leading-relaxed">
            <p>
              Blaze Art is the creative home of Yousuf, an independent artist
              based in Northern Cyprus. What started as a personal passion for
              painting has grown into a full-fledged art practice spanning
              original canvases, digital creations, and custom brand design.
            </p>
            <p>
              Every painting is hand-crafted with professional-grade materials,
              drawing inspiration from the Mediterranean landscape, abstract
              expressionism, and the interplay of light and shadow. Digital
              works explore the intersection of technology and organic beauty,
              while logo designs distill brand identities into timeless visual
              marks.
            </p>
            <p>
              Whether you are a collector looking for a statement piece, a
              business in need of a distinctive brand identity, or someone who
              simply wants to bring more beauty into their space, Blaze Art
              offers something crafted with intention and care.
            </p>
          </div>

          <div className="mt-12">
            <Button asChild size="lg" className="gap-2 rounded-none px-8 text-sm font-semibold uppercase tracking-wider">
              <Link href="/gallery">
                Explore the Gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
