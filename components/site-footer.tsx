import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="font-serif text-xl font-bold text-foreground">
              BLAZE<span className="text-primary">.</span>ART
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Original art from Northern Cyprus. Paintings, digital creations,
              and custom logo designs by Yousuf.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Gallery
              </h4>
              <nav className="mt-4 flex flex-col gap-3">
                <Link href="/gallery?category=Paintings" className="text-sm text-muted-foreground hover:text-primary">
                  Paintings
                </Link>
                <Link href="/gallery?category=Digital+Art" className="text-sm text-muted-foreground hover:text-primary">
                  Digital Art
                </Link>
                <Link href="/gallery?category=Logos" className="text-sm text-muted-foreground hover:text-primary">
                  Logos
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Info
              </h4>
              <nav className="mt-4 flex flex-col gap-3">
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary">
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            {new Date().getFullYear()} Blaze Art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
