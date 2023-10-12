"use client"

import { Product } from '@/types'
import { useState } from 'react'

import { getSizeName } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {

    const [selectedSize, setSelectedSize] = useState(product.sizes[0])

    return (
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

            <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight">
                    {product.price}
                </p>
            </div>

            <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base">{product.description}</div>
            </div>

            <div className="mt-4">
                <p>
                    Size: <strong>{getSizeName(selectedSize)}</strong>
                </p>
                {product.sizes.map((size) => (
                    <Button
                        key={size}
                        size={'sm'}
                        onClick={() => setSelectedSize(size)}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="mr-2 mt-4"
                    >
                        {getSizeName(size)}
                    </Button>
                ))}
            </div>

            <form className="mt-6">
                <div className="mt-4 flex">
                    <Button
                        type="button"
                        className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        Add to cart
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default ProductInfo