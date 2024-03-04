"use client"
import { Button, CartCard } from "@/components"
import { useCartShippingOptions, useAddShippingMethodToCart, useCart } from "medusa-react"
import Link from "next/link"

type Props = {
    cartId: string
}

const ShippingOptions = ({ cartId }: Props) => {
    const cart_id = localStorage.getItem("cart_id")
    const { cart, setCart } = useCart()

    console.log("cart : ", cart)

    const { shipping_options, isLoading } =
        useCartShippingOptions(cart_id!)

    console.log("shipping_options : ", shipping_options)

    const addShippingMethod = useAddShippingMethodToCart(cartId)

    const handleAddShippingMethod = (
        optionId: string
    ) => {
        console.log("optionId : ", optionId)
        fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cart_id}/shipping-methods`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                option_id: optionId, // ID of the selected option
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(({ cart }) => {
                console.log(cart.shipping_methods)
                setCart(cart)
            })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-16">
            <CartCard />
            {isLoading && <span>Loading...</span>}
            {shipping_options && !shipping_options.length && (
                <span>No shipping options</span>
            )}
            {shipping_options && (
                <ul className="flex flex-col gap-4">
                    {shipping_options.map(
                        (shipping_option) => (
                            <li key={shipping_option.id}>
                                <Button onClick={() => handleAddShippingMethod(shipping_option.id!)}>
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