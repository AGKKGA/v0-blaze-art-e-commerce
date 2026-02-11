import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedArtworks } from "@/components/featured-artworks"
import { CategoriesSection } from "@/components/categories-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedArtworks />
        <CategoriesSection />
      </main>
      <SiteFooter />
    </div>
  )
}
