"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createArtwork(formData: FormData) {
    const supabase = await createClient()

    const stockQuantity = formData.get("stock_quantity") as string

    const artwork = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        price: parseFloat(formData.get("price") as string),
        type: formData.get("type") as "digital" | "physical",
        stock_quantity: stockQuantity ? parseInt(stockQuantity) : null,
        image_url: formData.get("image_url") as string,
        watermarked_url: formData.get("watermarked_url") as string,
        is_featured: false,
        is_active: true,
    }

    const { error } = await supabase.from("artworks").insert(artwork)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/artworks")
    redirect("/admin/artworks")
}

export async function updateArtwork(id: string, formData: FormData) {
    const supabase = await createClient()

    const stockQuantity = formData.get("stock_quantity") as string

    const artwork = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        price: parseFloat(formData.get("price") as string),
        type: formData.get("type") as "digital" | "physical",
        stock_quantity: stockQuantity ? parseInt(stockQuantity) : null,
        image_url: formData.get("image_url") as string,
        watermarked_url: formData.get("watermarked_url") as string,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from("artworks")
        .update(artwork)
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/artworks")
    redirect("/admin/artworks")
}

export async function deleteArtwork(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from("artworks").delete().eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/artworks")
}

export async function toggleArtworkStatus(id: string, field: "is_active" | "is_featured", value: boolean) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("artworks")
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/artworks")
    revalidatePath("/gallery")
    revalidatePath("/")
}
