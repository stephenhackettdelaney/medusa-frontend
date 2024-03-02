"use client"
import { useState } from "react"
import { Product } from "@medusajs/medusa"
import { useProducts, useCreateLineItem, useCart } from "medusa-react"

const Products = () => {
  const { products, isLoading } = useProducts()

  const cart_id = localStorage.getItem("cart_id") || ""
  // console.log('in products : ', typeof cart_id, cart_id)

  const { setCart } = useCart()
  const createLineItem = useCreateLineItem(cart_id)

  const handleAddItem = (
    variantId: string,
    quantity: number,
  ) => {
    createLineItem.mutate({
      variant_id: variantId,
      quantity,
    }, {
      onSuccess: ({ cart }) => {
        setCart(cart)
      },
      onError: error => console.warn("add product error : ", error)
    })
  }

  return isLoading ? (
    <div>
      Loading...
    </div>
  ) : (
    <ul className="grid grid-cols-2 gap-24">
      {products?.map((product: Product) => {
        // console.log("product : ", product)
        return (
          <li className="flex flex-col items-center gap-9 max-w-sm bg-white p-5 rounded-xl" key={product.id}>
            <img src={product.thumbnail} className="w-48" />
            <h2 className="font-bold text-2xl">{product.title}</h2>
            <p className="text-center text-base">{product.description}</p>
            <button onClick={() => handleAddItem("variant_01HQRXS7ENH3BA5TCEAZ8R2JHP", 2)} className="border-2 border-cyan-900 px-6 py-2 bg-cyan-400 hover:bg-cyan-100">Add to cart</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Products