"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { CloudinaryUpload } from "@/components/cloudinary-upload"
import type { Artwork } from "@/lib/types"

interface ArtworkFormProps {
    artwork?: Artwork
    onSubmit: (data: FormData) => Promise<{ error?: string }>
    submitLabel?: string
}

export function ArtworkForm({
    artwork,
    onSubmit,
    submitLabel = "Save Artwork",
}: ArtworkFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState(artwork?.image_url || "")
    const [watermarkedUrl, setWatermarkedUrl] = useState(artwork?.watermarked_url || "")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!imageUrl || !watermarkedUrl) {
            setError("Please upload both the main image and watermarked preview")
            setLoading(false)
            return
        }

        const formData = new FormData(e.currentTarget)
        formData.set("image_url", imageUrl)
        formData.set("watermarked_url", watermarkedUrl)

        const result = await onSubmit(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push("/admin/artworks")
            router.refresh()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2">
                    <Label htmlFor="title" className="text-foreground">
                        Title *
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        required
                        defaultValue={artwork?.title}
                        className="mt-1 bg-card text-foreground"
                        placeholder="Sunset Over Mountains"
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <Label htmlFor="description" className="text-foreground">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={artwork?.description || ""}
                        className="mt-1 min-h-24 bg-card text-foreground"
                        placeholder="A beautiful painting of..."
                    />
                </div>

                {/* Category */}
                <div>
                    <Label htmlFor="category" className="text-foreground">
                        Category *
                    </Label>
                    <Select name="category" defaultValue={artwork?.category || "Paintings"}>
                        <SelectTrigger className="mt-1 bg-card text-foreground">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Paintings">Paintings</SelectItem>
                            <SelectItem value="Digital Art">Digital Art</SelectItem>
                            <SelectItem value="Logos">Logos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Type */}
                <div>
                    <Label htmlFor="type" className="text-foreground">
                        Type *
                    </Label>
                    <Select name="type" defaultValue={artwork?.type || "digital"}>
                        <SelectTrigger className="mt-1 bg-card text-foreground">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="digital">Digital</SelectItem>
                            <SelectItem value="physical">Physical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Price */}
                <div>
                    <Label htmlFor="price" className="text-foreground">
                        Price ($) *
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        defaultValue={artwork?.price}
                        className="mt-1 bg-card text-foreground"
                        placeholder="99.99"
                    />
                </div>

                {/* Stock Quantity */}
                <div>
                    <Label htmlFor="stock_quantity" className="text-foreground">
                        Stock Quantity
                    </Label>
                    <Input
                        id="stock_quantity"
                        name="stock_quantity"
                        type="number"
                        min="0"
                        defaultValue={artwork?.stock_quantity || ""}
                        className="mt-1 bg-card text-foreground"
                        placeholder="Leave empty for unlimited (digital)"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                        Leave empty for digital artworks with unlimited copies
                    </p>
                </div>

                {/* Image Upload - Single upload with automatic watermarking */}
                <div className="md:col-span-2">
                    <Label className="text-foreground">
                        Artwork Image *
                    </Label>
                    <p className="mt-1 mb-3 text-xs text-muted-foreground">
                        Upload your artwork - a watermarked version will be created automatically for the gallery
                    </p>
                    <CloudinaryUpload
                        value={imageUrl}
                        onChange={(url) => {
                            setImageUrl(url)
                            // Automatically create watermarked version
                            const watermarked = url.replace(
                                '/upload/',
                                '/upload/l_text:Arial_60_bold:BLAZE.ART,co_rgb:FFFFFF,o_40,g_center/'
                            )
                            setWatermarkedUrl(watermarked)
                        }}
                        onRemove={() => {
                            setImageUrl("")
                            setWatermarkedUrl("")
                        }}
                        label="Artwork"
                    />
                    {watermarkedUrl && (
                        <p className="mt-2 text-xs text-primary">
                            ✓ Watermarked preview created automatically
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {loading ? "Saving..." : submitLabel}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-border text-foreground"
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
