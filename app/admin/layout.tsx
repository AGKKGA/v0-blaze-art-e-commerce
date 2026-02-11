import { getUser } from "@/app/auth/actions"
import { AdminNav } from "@/components/admin-nav"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser()

    if (!user) {
        redirect("/auth/login")
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <aside className="hidden w-64 md:block">
                <AdminNav userEmail={user.email} />
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl p-6 lg:p-8">{children}</div>
            </main>
        </div>
    )
}
