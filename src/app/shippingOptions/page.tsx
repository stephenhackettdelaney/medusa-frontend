"use client"
import { Button, Cart } from "@/components"
import { useCartShippingOptions } from "medusa-react"
import Link from "next/link"

import { useCartManagement } from "@/lib/hooks/useCartManagment"

const ShippingOptions = () => {
    const { cart, setShippingOption } = useCartManagement()

    const { shipping_options, isLoading } = useCartShippingOptions(cart.id)


    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-16">
            <Cart />
            {isLoading && <span>Loading...</span>}
            {shipping_options && !shipping_options.length && (
                <span>No shipping options</span>
            )}
            {shipping_options && (
                <ul className="flex flex-col gap-4">
                    {shipping_options.map(
                        (shipping_option) => (
                            <li key={shipping_option.id}>
                                <Button onClick={() => setShippingOption(shipping_option.id!)}>
                                    {shipping_option.name}
                                </Button>
                            </li>
                        )
                    )}
                </ul>
            )}
            {cart?.shipping_methods?.length > 0 && <Link className='underline text-blue-500 text-center' href="/payment">Continue</Link>}
        </div>
    )
}

export default ShippingOptions