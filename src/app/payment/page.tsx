"use client"
import { useEffect } from "react"
import { useCartShippingOptions, useAddShippingMethodToCart, useCart } from "medusa-react"
import { CartCard, Button } from "@/components"

export default function Payment() {
    const cart_id = localStorage.getItem("cart_id")
    const { cart, setCart } = useCart()

    console.log("cart : ", cart)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cart_id}/payment-sessions`, {
            method: "POST",
            credentials: "include",
        })
            .then((response) => response.json())
            .then(({ cart }) => {
                console.log(cart.payment_sessions)
                setCart(cart)
            })
    }, [cart_id, setCart])

    function completeOrder() {
        fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cart_id}/complete`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(({ type, data }) => {
                console.log(type, data)
            })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-16">
            <CartCard />
            <h2>PAYMENT PAGE</h2>
            <Button onClick={completeOrder}>Complete Order</Button>
        </div>
    )
}