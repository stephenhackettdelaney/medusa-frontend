"use client"
import { useState } from "react"
import type { ReactNode } from "react"
import { Product } from "@medusajs/medusa"
import { useProducts } from "medusa-react"
import { useCartManagement } from "@/lib/hooks/useCartManagment"
import { Modal } from "."

const Products = () => {
  const { products, isLoading } = useProducts()
  const { cart, addCartItem, setEmail } = useCartManagement()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState("")

  function addItemIfEmail(variant: string, quantity: number) {
    if (!cart?.email) {
      setIsOpen(true)
      return
    }
    else {
      addCartItem(variant, quantity)
      return
    }
  }

  async function handleAddEmail(event: any) {
    event.preventDefault()

    const email = event.target.elements["email"].value
    setIsOpen(false)

    setEmail(email)
    addCartItem(selectedVariant, 1)

  }

  return isLoading ? (
    <div>
      Loading...
    </div>
  ) : (
    <ul className="w-full rounded">
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <form className="flex flex-col gap-4 items-start" onSubmit={handleAddEmail}>
          <input className="border-2 border-zinc-300 pl-2" type="email" name="email" />
          <button type="submit" className="border-2 border-blue-400 bg-blue-200 py-2 px-5">Add email</button>
        </form>
      </Modal>
      {products?.map((product: Product, index: number) => (
        <ProductCard
          key={index}
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          addItemIfEmail={addItemIfEmail}
        />))}
    </ul>
  )
}

function ProductCard({ product, selectedVariant, setSelectedVariant, addItemIfEmail }
  : {
    product: any,
    selectedVariant: string | null,
    setSelectedVariant: any,
    addItemIfEmail: any
  }): ReactNode {

  return (
    <li className="flex flex-col items-center gap-9 bg-white w-full" key={product.id}>
      {/* <img src={product.thumbnail} /> */}
      <h2 className="font-bold text-2xl underline">{product.title}</h2>
      <p className="text-center text-base">{product.description}</p>
      <Grid>
        {product.variants.map(({ id, title }: { id: string, title: string }, index: number) =>
          <button key={index}
            className={`border-2  p-5 ${selectedVariant === id ? "border-yellow-700 bg-yellow-400" : "border-green-500 bg-emerald-300"}`}
            onClick={() => setSelectedVariant(id)}>
            {title}
          </button>)}
      </Grid>
      <button
        onClick={() => addItemIfEmail(selectedVariant, 1)}
        disabled={!selectedVariant}
        className={`border-2 border-cyan-900 px-6 py-2 ${!selectedVariant ? "cursor-not-allowed bg-zinc-300" : "bg-cyan-400 hover:bg-cyan-100"}`}
      >
        Add to cart
      </button>
    </li>
  )
}

function Grid({ children }: { children: ReactNode }): ReactNode {
  return (
    <section className="grid grid-cols-3 gap-4">{children}</section>
  )
}



export default Products