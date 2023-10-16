"use client"

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useShoppingCart } from 'use-shopping-cart'

const Navbar = () => {

    const { cartCount } = useShoppingCart()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <Container>
                <div className='flex items-center py-8 justify-between max-xl:px-4'>
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="inline-block text-2xl font-bold text-themeText dark:text-white">
                            The Lily & Co
                        </span>
                    </Link>
                    <div className="flex items-center space-x-1">
                        <Link href="/cart">
                            <Button size="sm" variant="ghost">
                                <ShoppingBag className="h-5 w-5" />
                                <span className="ml-2 text-sm font-bold">{cartCount}</span>
                                <span className="sr-only">Cart</span>
                            </Button>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Navbar