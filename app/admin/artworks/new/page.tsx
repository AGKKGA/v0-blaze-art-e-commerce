import { ArtworkForm } from "@/components/artwork-form"
import { createArtwork } from "../actions"

export default function NewArtworkPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Add New Artwork
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Upload a new artwork to your gallery
                </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
                <ArtworkForm onSubmit={createArtwork} submitLabel="Create Artwork" />
            </div>
        </div>
    )
}
