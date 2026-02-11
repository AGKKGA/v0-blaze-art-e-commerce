import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { Image, ShoppingCart, DollarSign, Plus } from "lucide-react"

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch stats
    const [artworksResult, ordersResult] = await Promise.all([
        supabase.from("artworks").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total", { count: "exact" }),
    ])

    const totalArtworks = artworksResult.count || 0
    const totalOrders = ordersResult.count || 0
    const totalRevenue = ordersResult.data?.reduce(
        (sum, order) => sum + Number(order.total),
        0
    ) || 0

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Welcome to your art gallery admin panel
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Artworks"
                    value={totalArtworks}
                    icon={Image}
                    description="Active and inactive artworks"
                />
                <StatsCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={ShoppingCart}
                    description="All time orders"
                />
                <StatsCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    description="All time revenue"
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                    Quick Actions
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/admin/artworks">
                        <Button
                            variant="outline"
                            className="h-auto w-full flex-col items-start gap-2 border-border p-4 hover:border-primary"
                        >
                            <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-foreground">
                                    Add Artwork
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Upload a new artwork to your gallery
                            </p>
                        </Button>
                    </Link>

                    <Link href="/admin/artworks">
                        <Button
                            variant="outline"
                            className="h-auto w-full flex-col items-start gap-2 border-border p-4 hover:border-primary"
                        >
                            <div className="flex items-center gap-2">
                                <Image className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-foreground">
                                    Manage Artworks
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Edit, delete, or feature artworks
                            </p>
                        </Button>
                    </Link>

                    <Link href="/admin/orders">
                        <Button
                            variant="outline"
                            className="h-auto w-full flex-col items-start gap-2 border-border p-4 hover:border-primary"
                        >
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-foreground">
                                    View Orders
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Manage customer orders and shipments
                            </p>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
                    Recent Activity
                </h2>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Activity feed coming soon...
                    </p>
                </div>
            </div>
        </div>
    )
}
