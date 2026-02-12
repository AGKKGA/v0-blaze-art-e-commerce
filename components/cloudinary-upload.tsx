"use client"

import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface CloudinaryUploadProps {
    value?: string
    onChange: (url: string) => void
    onRemove: () => void
    label: string
}

export function CloudinaryUpload({ value, onChange, onRemove, label }: CloudinaryUploadProps) {
    const [isUploading, setIsUploading] = useState(false)

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
        setIsUploading(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-border">
                        <Image
                            src={value}
                            alt={label}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={onRemove}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <div className="w-48 h-48 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                )}

                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={onUpload}
                    onQueuesEnd={() => setIsUploading(false)}
                    onQueuesStart={() => setIsUploading(true)}
                >
                    {({ open }) => (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : value ? "Change Image" : `Upload ${label}`}
                        </Button>
                    )}
                </CldUploadWidget>
            </div>

            {value && (
                <p className="text-xs text-muted-foreground truncate">
                    {value}
                </p>
            )}
        </div>
    )
}
