import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ArtworkForm } from "@/components/artwork-form"
import { updateArtwork } from "../../actions"
import type { Artwork } from "@/lib/types"

interface EditArtworkPageProps {
    params: Promise<{ id: string }>
}

export default async function EditArtworkPage(props: EditArtworkPageProps) {
    const params = await props.params
    const supabase = await createClient()

    const { data: artwork } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", params.id)
        .single()

    if (!artwork) {
        notFound()
    }

    async function handleUpdate(formData: FormData) {
        "use server"
        return updateArtwork(params.id, formData)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Edit Artwork
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Update artwork details
                </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
                <ArtworkForm
                    artwork={artwork as Artwork}
                    onSubmit={handleUpdate}
                    submitLabel="Update Artwork"
                />
            </div>
        </div>
    )
}
