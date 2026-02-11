"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Order } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { MoreHorizontal, Eye } from "lucide-react"
import { updateOrderStatus } from "./actions"
import { toast } from "sonner"

interface OrderActionsProps {
    order: Order
}

export function OrderActions({ order }: OrderActionsProps) {
    const router = useRouter()
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)

    async function handleStatusChange(newStatus: Order["status"]) {
        const result = await updateOrderStatus(order.id, newStatus)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success(`Order status updated to ${newStatus}`)
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
                    <DropdownMenuItem
                        onClick={() => setShowDetailsDialog(true)}
                        className="cursor-pointer text-foreground"
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Update Status
                    </DropdownMenuLabel>
                    {order.status !== "paid" && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("paid")}
                            className="cursor-pointer text-foreground"
                        >
                            Mark as Paid
                        </DropdownMenuItem>
                    )}
                    {order.status !== "shipped" && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("shipped")}
                            className="cursor-pointer text-foreground"
                        >
                            Mark as Shipped
                        </DropdownMenuItem>
                    )}
                    {order.status !== "delivered" && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("delivered")}
                            className="cursor-pointer text-foreground"
                        >
                            Mark as Delivered
                        </DropdownMenuItem>
                    )}
                    {order.status !== "cancelled" && (
                        <DropdownMenuItem
                            onClick={() => handleStatusChange("cancelled")}
                            className="cursor-pointer text-destructive focus:text-destructive"
                        >
                            Cancel Order
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent className="border-border bg-card">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Order Details</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Order ID: {order.id}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-foreground">
                                Customer Information
                            </h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Name: {order.customer_name}</p>
                                <p>Email: {order.customer_email}</p>
                            </div>
                        </div>
                        {order.shipping_address && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-foreground">
                                    Shipping Address
                                </h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>{order.shipping_address.line1}</p>
                                    {order.shipping_address.line2 && (
                                        <p>{order.shipping_address.line2}</p>
                                    )}
                                    <p>
                                        {order.shipping_address.city}
                                        {order.shipping_address.state &&
                                            `, ${order.shipping_address.state}`}{" "}
                                        {order.shipping_address.postal_code}
                                    </p>
                                    <p>{order.shipping_address.country}</p>
                                </div>
                            </div>
                        )}
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-foreground">
                                Order Summary
                            </h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>
                                    Total: ${Number(order.total).toFixed(2)}{" "}
                                    {order.currency.toUpperCase()}
                                </p>
                                <p className="capitalize">Status: {order.status}</p>
                                <p>
                                    Created: {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
