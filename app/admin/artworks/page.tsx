import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { Artwork } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import { ArtworkActions } from "./artwork-actions"

export default async function ArtworksPage() {
    const supabase = await createClient()

    const { data: artworks } = await supabase
        .from("artworks")
        .select("*")
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground">
                        Artworks
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your art gallery collection
                    </p>
                </div>
                <Link href="/admin/artworks/new">
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Artwork
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-muted-foreground">Image</TableHead>
                            <TableHead className="text-muted-foreground">Title</TableHead>
                            <TableHead className="text-muted-foreground">Category</TableHead>
                            <TableHead className="text-muted-foreground">Type</TableHead>
                            <TableHead className="text-muted-foreground">Price</TableHead>
                            <TableHead className="text-muted-foreground">Stock</TableHead>
                            <TableHead className="text-muted-foreground">Status</TableHead>
                            <TableHead className="text-right text-muted-foreground">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!artworks || artworks.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No artworks found. Add your first artwork to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            (artworks as Artwork[]).map((artwork) => (
                                <TableRow
                                    key={artwork.id}
                                    className="border-border hover:bg-accent/50"
                                >
                                    <TableCell>
                                        <div className="relative h-12 w-12 overflow-hidden rounded">
                                            <Image
                                                src={artwork.watermarked_url}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground">
                                        {artwork.title}
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {artwork.category}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="border-border capitalize text-foreground"
                                        >
                                            {artwork.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        ${Number(artwork.price).toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {artwork.stock_quantity ?? "∞"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {artwork.is_active && (
                                                <Badge
                                                    variant="outline"
                                                    className="border-green-500/50 bg-green-500/10 text-green-500"
                                                >
                                                    Active
                                                </Badge>
                                            )}
                                            {!artwork.is_active && (
                                                <Badge
                                                    variant="outline"
                                                    className="border-red-500/50 bg-red-500/10 text-red-500"
                                                >
                                                    Inactive
                                                </Badge>
                                            )}
                                            {artwork.is_featured && (
                                                <Badge
                                                    variant="outline"
                                                    className="border-primary/50 bg-primary/10 text-primary"
                                                >
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ArtworkActions artwork={artwork} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
