"use client"

import { CartProvider } from "use-shopping-cart"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

interface Props {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    return (
        <CartProvider
            currency="INR"
            shouldPersist
            cartMode="checkout-session"
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
        >
            <Toaster />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </CartProvider>
    )
}