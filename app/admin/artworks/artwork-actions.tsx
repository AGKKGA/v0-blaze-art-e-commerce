"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Artwork } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, Edit, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react"
import { deleteArtwork, toggleArtworkStatus } from "./actions"
import { toast } from "sonner"

interface ArtworkActionsProps {
    artwork: Artwork
}

export function ArtworkActions({ artwork }: ArtworkActionsProps) {
    const router = useRouter()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)
        const result = await deleteArtwork(artwork.id)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success("Artwork deleted successfully")
            router.refresh()
        }
        setLoading(false)
        setShowDeleteDialog(false)
    }

    async function handleToggleActive() {
        const result = await toggleArtworkStatus(artwork.id, "is_active", !artwork.is_active)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success(`Artwork ${artwork.is_active ? "deactivated" : "activated"}`)
            router.refresh()
        }
    }

    async function handleToggleFeatured() {
        const result = await toggleArtworkStatus(artwork.id, "is_featured", !artwork.is_featured)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success(`Artwork ${artwork.is_featured ? "unfeatured" : "featured"}`)
            router.refresh()
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-border bg-card">
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/admin/artworks/${artwork.id}/edit`}
                            className="cursor-pointer text-foreground"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleToggleActive}
                        className="cursor-pointer text-foreground"
                    >
                        {artwork.is_active ? (
                            <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Deactivate
                            </>
                        ) : (
                            <>
                                <Eye className="mr-2 h-4 w-4" />
                                Activate
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleToggleFeatured}
                        className="cursor-pointer text-foreground"
                    >
                        {artwork.is_featured ? (
                            <>
                                <StarOff className="mr-2 h-4 w-4" />
                                Unfeature
                            </>
                        ) : (
                            <>
                                <Star className="mr-2 h-4 w-4" />
                                Feature
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="cursor-pointer text-destructive focus:text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="border-border bg-card">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">
                            Delete Artwork
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                            Are you sure you want to delete "{artwork.title}"? This action
                            cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-border text-foreground">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
