"use client"
import { useState, useEffect, type ReactNode } from 'react'
import { Cart } from '@/components'
import { useCreateLineItem, useCart } from "medusa-react"

export default function ProductCollection({ params }: { params: { slug: string } }): ReactNode {
    const [collection, setCollection] = useState(null)
    const [variant, setVariant] = useState("")

    console.log("collection : ", collection)

    // localStorage.removeItem("cart_id")

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?collection_id[]=${params.slug}`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then(({ products }) => {
                if (!products.length) {
                    // product does not exist
                    console.log('no products')
                    return
                }
                const product = products[0]
                setCollection(product)
                return
            })
    }, [params.slug])

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

    return (
        <div className='grid grid-cols-[1fr,2fr] gap-8 p-8'>
            <Cart />
            <section>
                {collection ? (
                    <div className="flex min-h-screen flex-col items-center gap-8 p-24">
                        <section className='flex flex-col justify-center items-center gap-2'>
                            <h2 className='text-3xl font-semibold underline'>{collection.title}</h2>
                            <p>{collection.subtitle}</p>
                        </section>
                        <Grid>
                            {collection.variants.map(({ id, title }, index) => <button key={index} className={`border-2   p-5 ${variant === id ? "border-yellow-700 bg-yellow-400" : "border-green-500 bg-emerald-300"}`} onClick={() => {
                                setVariant(id)
                                handleAddItem(id, 1)
                            }}>{title}</button>)}
                        </Grid>
                    </div>
                ) : <div>No Collection items</div>
                }
            </section>
        </div>
    )
}

function Grid({ children }: { children: ReactNode }): ReactNode {
    return (
        <section className="grid grid-cols-3 gap-4">{children}</section>
    )
}
