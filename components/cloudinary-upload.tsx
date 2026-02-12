"use client"

import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Upload, X, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"

interface CloudinaryUploadProps {
    value?: string
    onChange: (url: string) => void
    onRemove: () => void
    label: string
    watermarked?: boolean
}

export function CloudinaryUpload({ value, onChange, onRemove, label, watermarked = false }: CloudinaryUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(value || "")

    useEffect(() => {
        setImageUrl(value || "")
    }, [value])

    const onUpload = (result: any) => {
        const uploadedUrl = result.info.secure_url
        setImageUrl(uploadedUrl)

        // If this is for watermarked version, apply Cloudinary transformation
        if (watermarked) {
            // Add watermark overlay using Cloudinary transformation
            const watermarkedUrl = uploadedUrl.replace(
                '/upload/',
                '/upload/l_text:Arial_60_bold:BLAZE.ART,co_rgb:FFFFFF,o_40,g_center/'
            )
            onChange(watermarkedUrl)
            toast.success("Image uploaded and watermarked!")
        } else {
            onChange(uploadedUrl)
            toast.success("Image uploaded successfully!")
        }

        setIsUploading(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {imageUrl ? (
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-primary/50 bg-card">
                        <Image
                            src={imageUrl}
                            alt={label}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <button
                            type="button"
                            onClick={() => {
                                onRemove()
                                setImageUrl("")
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 shadow-lg"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Uploaded
                        </div>
                    </div>
                ) : (
                    <div className="w-48 h-48 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-card/50">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">No image</p>
                    </div>
                )}

                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={onUpload}
                    onQueuesEnd={() => setIsUploading(false)}
                    onQueuesStart={() => setIsUploading(true)}
                    options={{
                        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                        sources: ['local', 'url', 'camera'],
                        multiple: false,
                        maxFiles: 1,
                    }}
                >
                    {({ open }) => (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                            disabled={isUploading}
                            className="border-primary/50 hover:bg-primary/10"
                        >
                            {isUploading ? "Uploading..." : imageUrl ? "Change Image" : `Upload ${label}`}
                        </Button>
                    )}
                </CldUploadWidget>
            </div>

            {imageUrl && (
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground truncate">
                        {imageUrl}
                    </p>
                    {watermarked && (
                        <p className="text-xs text-primary flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Watermark applied automatically
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
