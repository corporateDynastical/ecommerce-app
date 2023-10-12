import React from 'react'
import Link from 'next/link'

import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
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
                                <span className="ml-2 text-sm font-bold">0</span>
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