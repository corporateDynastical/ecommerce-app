"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDiscount } from "@/lib/utils"

const CartSummary = () => {
    const {
        formattedTotalPrice,
        totalPrice: initialTotalPrice,
        cartDetails,
        cartCount,
        redirectToCheckout,
    } = useShoppingCart()
    const [isLoading, setIsLoading] = useState(false)
    const [isCouponLoading, setIsCouponLoading] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const isDisabled = isLoading || cartCount! === 0
    const shippingAmount = cartCount! > 0 ? 5000 : 0
    const [totalAmount, setTotalAmount] = useState(initialTotalPrice! + shippingAmount)

    const submitCouponValue = (e: React.FormEvent) => {
        e.preventDefault();
        const discount = getDiscount(couponCode.toUpperCase())
        if (!discount) {
            return null
        } else {
            setTotalAmount(totalAmount - (totalAmount * (discount! / 100)))
            setIsCouponLoading(true)
        }
    }

    const onCheckout = async () => {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/api/checkout', {
            method: "POST",
            body: JSON.stringify(cartDetails)
        })
        const data = await response.json()
        const result = await redirectToCheckout(data.id)
        if (result?.error) {
            console.error(result)
        }
        setIsLoading(false)
    }

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h2 id="summary-heading" className="text-lg font-medium">
                Order summary
            </h2>
            <div className="mt-6">
                <div className="flex w-full justify-between items-center gap-2">
                    <Input disabled={isCouponLoading} type="text" placeholder="Enter coupon code" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} />
                    <Button disabled={isCouponLoading} type="submit" onClick={submitCouponValue}>Apply</Button>
                </div>
            </div>
            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium">{formattedTotalPrice}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
                    <dt className="flex items-center text-sm">
                        <span>Shipping estimate</span>
                    </dt>
                    <dd className="text-sm font-medium">
                        {formatCurrencyString({ value: shippingAmount, currency: "INR" })}
                    </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
                    <dt className="text-base font-medium">Order total</dt>
                    <dd className="text-base font-medium">
                        {formatCurrencyString({ value: totalAmount, currency: "INR" })}
                    </dd>
                </div>
            </dl>
            <div className="mt-6">
                <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Loading..." : "Checkout"}
                </Button>
            </div>
        </section>
    )
}

export default CartSummary