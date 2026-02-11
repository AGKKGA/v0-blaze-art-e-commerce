import Link from "next/link"
import { Paintbrush, Monitor, PenTool } from "lucide-react"

const categories = [
  {
    name: "Paintings",
    description: "Original hand-crafted paintings on canvas. Bold strokes, vivid colors, and tangible texture.",
    icon: Paintbrush,
    href: "/gallery?category=Paintings",
  },
  {
    name: "Digital Art",
    description: "High-resolution digital creations for print or screen. Instant download after purchase.",
    icon: Monitor,
    href: "/gallery?category=Digital+Art",
  },
  {
    name: "Logos",
    description: "Custom logo designs for brands and personal identity. Delivered as vector and raster files.",
    icon: PenTool,
    href: "/gallery?category=Logos",
  },
]

export function CategoriesSection() {
  return (
    <section className="border-y border-border/40 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Browse by Category
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Three Expressions of Art
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center rounded-none border border-border/40 bg-background p-8 text-center transition-all hover:border-primary/40"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {cat.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
