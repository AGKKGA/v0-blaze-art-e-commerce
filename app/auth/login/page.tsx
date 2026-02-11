"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { login } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function LoginForm() {
    const searchParams = useSearchParams()
    const message = searchParams.get("message")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await login(formData)
        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
                <Link href="/" className="inline-block">
                    <span className="font-serif text-3xl font-bold tracking-tight text-foreground">
                        BLAZE<span className="text-primary">.</span>ART
                    </span>
                </Link>
                <h1 className="mt-6 font-serif text-2xl font-bold text-foreground">
                    Admin Login
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Sign in to manage your art gallery
                </p>
            </div>

            {/* Messages */}
            {message && (
                <Alert className="border-primary/50 bg-primary/10">
                    <AlertDescription className="text-sm text-foreground">
                        {message}
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Form */}
            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="text-foreground">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 bg-card text-foreground"
                            placeholder="admin@blazeart.com"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-foreground">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 bg-card text-foreground"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link
                        href="/auth/signup"
                        className="font-medium text-primary hover:text-primary/80"
                    >
                        Sign up
                    </Link>
                </div>

                <div className="text-center">
                    <Link
                        href="/"
                        className="text-sm text-muted-foreground hover:text-primary"
                    >
                        ← Back to gallery
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    )
}
