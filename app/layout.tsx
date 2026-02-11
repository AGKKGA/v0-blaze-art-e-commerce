import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Toaster } from "sonner"
import { CartProvider } from "@/lib/cart-store"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Blaze Art | Premium Art Gallery",
  description:
    "Discover and collect original paintings, digital art, and custom logos by Yousuf. Based in Northern Cyprus.",
}

export const viewport: Viewport = {
  themeColor: "#0e1117",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "hsl(220 14% 9%)",
                border: "1px solid hsl(220 12% 16%)",
                color: "hsl(40 10% 92%)",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
