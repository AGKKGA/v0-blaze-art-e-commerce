"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = ["All", "Paintings", "Digital Art", "Logos"]
const types = ["All", "Physical", "Digital"]
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

export function GalleryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get("category") || "All"
  const activeType = searchParams.get("type") || "All"
  const activeSort = searchParams.get("sort") || "newest"

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "All" || value === "newest") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/gallery?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Category
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => updateParams("category", cat)}
            className={cn(
              "border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
              activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Type + Sort row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Type
          </span>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateParams("type", t)}
              className={cn(
                "border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                activeType === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <select
          value={activeSort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
