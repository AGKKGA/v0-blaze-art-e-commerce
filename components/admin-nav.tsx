"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Image, ShoppingCart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/auth/actions"

const navItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Artworks",
        href: "/admin/artworks",
        icon: Image,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
]

interface AdminNavProps {
    userEmail?: string
}

export function AdminNav({ userEmail }: AdminNavProps) {
    const pathname = usePathname()

    return (
        <div className="flex h-full flex-col border-r border-border bg-card">
            {/* Logo */}
            <div className="border-b border-border p-6">
                <Link href="/admin" className="flex items-center gap-2">
                    <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                        BLAZE<span className="text-primary">.</span>ART
                    </span>
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* User section */}
            <div className="border-t border-border p-4">
                {userEmail && (
                    <div className="mb-3 rounded-lg bg-accent/50 p-3">
                        <p className="text-xs text-muted-foreground">Logged in as</p>
                        <p className="mt-1 truncate text-sm font-medium text-foreground">
                            {userEmail}
                        </p>
                    </div>
                )}
                <form action={logout}>
                    <Button
                        type="submit"
                        variant="outline"
                        className="w-full justify-start gap-2 border-border text-muted-foreground hover:text-foreground"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    )
}
