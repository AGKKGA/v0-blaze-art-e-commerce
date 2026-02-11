"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { Order } from "@/lib/types"

export async function updateOrderStatus(
    orderId: string,
    status: Order["status"]
) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", orderId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/orders")
}
