import { createClient } from "@/lib/supabase/server"
import type { Order } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { OrderActions } from "./order-actions"

const statusColors = {
    pending: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
    paid: "border-green-500/50 bg-green-500/10 text-green-500",
    shipped: "border-blue-500/50 bg-blue-500/10 text-blue-500",
    delivered: "border-primary/50 bg-primary/10 text-primary",
    cancelled: "border-red-500/50 bg-red-500/10 text-red-500",
}

export default async function OrdersPage() {
    const supabase = await createClient()

    const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Orders</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage customer orders and shipments
                </p>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-muted-foreground">Order ID</TableHead>
                            <TableHead className="text-muted-foreground">Customer</TableHead>
                            <TableHead className="text-muted-foreground">Email</TableHead>
                            <TableHead className="text-muted-foreground">Total</TableHead>
                            <TableHead className="text-muted-foreground">Status</TableHead>
                            <TableHead className="text-muted-foreground">Date</TableHead>
                            <TableHead className="text-right text-muted-foreground">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!orders || orders.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No orders yet. Orders will appear here when customers make
                                    purchases.
                                </TableCell>
                            </TableRow>
                        ) : (
                            (orders as Order[]).map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="border-border hover:bg-accent/50"
                                >
                                    <TableCell className="font-mono text-xs text-foreground">
                                        {order.id.slice(0, 8)}...
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground">
                                        {order.customer_name}
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {order.customer_email}
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        ${Number(order.total).toFixed(2)} {order.currency.toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={statusColors[order.status]}
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {formatDistanceToNow(new Date(order.created_at), {
                                            addSuffix: true,
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <OrderActions order={order} />
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
