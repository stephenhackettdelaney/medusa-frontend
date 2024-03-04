"use client"
import React from 'react'
import Link from 'next/link'
import { useCart } from "medusa-react"
import { Button, CartCard } from '@/components'

function Checkout() {
    const cart_id = localStorage.getItem("cart_id")

    const { cart, setCart } = useCart()

    const addShippingAddress = (address) => {
        fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cart_id}`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                shipping_address: {
                    company: address.company,
                    first_name: address.first_name,
                    last_name: address.last_name,
                    address_1: address.address_1,
                    address_2: address.address_2,
                    city: address.city,
                    country_code: address.country_code,
                    province: address.province,
                    postal_code: address.psotal_code,
                    phone: address.phone,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(({ cart }) => {
                setCart(cart)
            })
            .catch((error) => { throw new Error('SHIPPING ERROR : ', error) })
    }

    function handleOnSubmit() {
        addShippingAddress(SHIPPING_ADDRESS)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-16">
            <CartCard />
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold'>Shipping address to add to Cart</h2>
                <pre>{JSON.stringify(SHIPPING_ADDRESS, null, "\t")}</pre>
                <Button onClick={handleOnSubmit}>Submit Address</Button>
                {cart?.shipping_address_id && <Link className='underline text-blue-500 text-center' href="/shippingOptions">Shipping options</Link>}
            </div>
        </div>

    )
}

const SHIPPING_ADDRESS = {
    company: "CoMedia Design",
    first_name: "Stephen",
    last_name: "Hackett-Delaney",
    address_1: "2505 Triumph st.",
    address_2: "",
    city: "Vancouver",
    country_code: "it", // The 2 character ISO code of the country in lower case
    province: "British Colombia",
    postal_code: "V5K2S7",
    phone: "7789986103",
}

export default Checkout