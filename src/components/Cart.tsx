"use client"
import React from "react"
import Link from "next/link"
import { useRegion } from "medusa-react"
import { useCartManagement } from "@/lib/hooks/useCartManagment"
import { useRouter } from "next/navigation"

const Cart = () => {
  const { cart, createNewCart } = useCartManagement()

  const isReadyForCheckout = !!cart?.id && !!cart?.email && cart.items.length
  const router = useRouter()

  function initCheckout() {
    // in wrong place if setting payment provider ?
    // But if its just authorize.net what then ?
    // setPaymentSession()
    router.push("/shipping")
  }

  return (
    <div className="flex flex-col items-end gap-4">
      <div className="flex flex-col gap-4">
        <CartCard cart={cart} />
        <section className="flex gap-4">
          <button type="button" onClick={createNewCart} className="border-2 border-red-400 bg-white text-red-500 px-5 py-2">clear cart</button>
          <button
            className={`px-6 py-2  ${isReadyForCheckout ? "bg-cyan-400 hover:bg-cyan-100" : "bg-zinc-200 cursor-not-allowed"}`}
            onClick={initCheckout}
          >
            Checkout
          </button>
        </section>
      </div>
    </div>
  )
}

function CartCard({ cart }: { cart: any }) {

  const { region } = useRegion(cart?.region_id)

  return (
    <details className=" bg-white p-5 rounded">
      <summary>
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl underline">{`Cart (items: ${cart?.items.length || 0})`}</h2>
        </div>
      </summary>
      <section className="flex flex-col gap-4 mt-4">
        <p><strong>ID:</strong> {!!cart?.id ? cart?.id : undefined}</p>
        <p><strong>EMAIL:</strong> {!!cart?.email ? cart?.email : undefined}</p>
        <p><strong>ADDRESS ID:</strong> {!!cart?.shipping_address_id ? cart.shipping_address_id! : undefined}</p>
        <p><strong>ITEMS IN CART:</strong> {cart?.items.length || 0}</p>
        <p><strong>Region:</strong> {region?.name}</p>
        <p><strong>Payment session:</strong>{cart?.payment_session?.data?.status}</p>
      </section>
    </details>
  )
}

function clearCart() {
  localStorage.removeItem("cartId")
}

export default Cart
