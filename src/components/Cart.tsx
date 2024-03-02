"use client"
import React, { useEffect } from "react"
import { useCart } from "medusa-react"
import Link from "next/link"

import { CartCard } from "."

const Cart = () => {
  const { cart, setCart, createCart, updateCart } = useCart()

  // RESET CART
  // localStorage.removeItem("cart_id")

  const cart_id = localStorage.getItem("cart_id")

  useEffect(() => {
    if (cart_id) {
      fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cart_id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(({ cart }) => setCart(cart))
    }


  }, [cart_id, setCart])

  const handleCreateCart = () => {
    createCart.mutate({}, {
      onSuccess: ({ cart }) => {
        localStorage.setItem("cart_id", cart.id)
      },
    })
  }

  const changeEmail = (email: string) => {
    updateCart.mutate({
      email,
    },
      {
        onSuccess: (({ cart }) => setCart(cart)),
        onError: (error => console.log("change email error : ", error))
      }
    )
  }

  const email = "stephenhackettdelaney@gmail.com"

  return (
    <div className="flex flex-col gap-4">
      <CartCard />
      {/* Currently set to EU - seems to be default - haven't looked into set US/CA region as default */}
      {/* Hardcoded iso-2 it ( ITALY ) for country code ( in shipping ) */}
      {/* {regions?.length && (
        <ul>
          {regions.map((region) => {
            console.log("region : ", region)
            return (
              <li key={region.id}>
                {region.name}
              </li>
            )
          })}
        </ul>
      )} */}
      {/* Probably done when user enters site */}
      {!cart_id && <button onClick={handleCreateCart} className="border-2 border-cyan-900 px-6 py-2 bg-cyan-400 hover:bg-cyan-100">Create Cart</button>}
      {(!!cart_id && !cart?.email) && (
        <button onClick={() => changeEmail(email)} className="border-2 border-cyan-900 px-6 py-2 bg-cyan-400 hover:bg-cyan-100">Add email</button>
      )}
      {(!!cart_id && !!cart?.email && cart.items.length > 0) && <Link className="border-2 border-cyan-900 px-6 py-2 bg-cyan-400 hover:bg-cyan-100" href="/shipping">Checkout</Link>}
    </div>
  )
}

export default Cart
