import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-art.jpg"
          alt="Gallery interior with dramatic lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 py-24 lg:px-8">
        <span className="mb-4 inline-block w-fit text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Original Art by Yousuf
        </span>
        <h1 className="max-w-3xl font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="text-balance">Art That Sets Your Space</span>{" "}
          <span className="text-primary">Ablaze</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Discover hand-crafted paintings, bold digital art, and bespoke logo
          designs from Northern Cyprus. Each piece tells a unique story.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="gap-2 rounded-none px-8 text-sm font-semibold uppercase tracking-wider">
            <Link href="/gallery">
              Explore Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 rounded-none border-border bg-transparent px-8 text-sm font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary"
          >
            <Link href="/about">About the Artist</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
