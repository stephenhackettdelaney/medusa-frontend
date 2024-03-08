"use client"
import { useState } from "react"
import type { ReactNode } from "react"
import { Product } from "@medusajs/medusa"
import { useProducts, useCreateLineItem, useCart } from "medusa-react"

const Products = () => {
  const { products, isLoading } = useProducts()
  const cart_id = localStorage.getItem("cart_id") || ""

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
    <ul className="grid">
      {products?.map((product: Product, index: numer) => <ProductCard key={index} product={product} handleAddItem={handleAddItem} />)}
    </ul>
  )
}

function ProductCard({ product, handleAddItem }: { product: Product, handleAddItem: any }): ReactNode {
  const [variant, setVariant] = useState("")

  console.log("variant : ", variant)
  return (
    <li className="flex flex-col items-center gap-9 bg-white" key={product.id}>
      <img src={product.thumbnail} />
      <h2 className="font-bold text-2xl">{product.title}</h2>
      <p className="text-center text-base">{product.description}</p>
      <Grid>
        {product.variants.map(({ id, title }, index) => <button key={index} className="border-2 border-green-500 bg-emerald-300 p-5" onClick={() => setVariant(id)}>{title}</button>)}
      </Grid>
      <button onClick={() => handleAddItem(variant, 2)} className="border-2 border-cyan-900 px-6 py-2 bg-cyan-400 hover:bg-cyan-100">Add to cart</button>
    </li>
  )
}

function Grid({ children }: { children: ReactNode }): ReactNode {
  return (
    <section className="grid grid-cols-3 gap-4">{children}</section>
  )
}

export default Products