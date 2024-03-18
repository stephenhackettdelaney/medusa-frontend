"use client"
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Page, Modal } from '@/components'
import { useProducts } from "medusa-react"
import { useCartManagement } from '@/lib/hooks/useCartManagment'

export default function ProductCollection({ params }: { params: { slug: string } }): ReactNode {
    const { products, isLoading } = useProducts({
        collection_id: [params.slug],
        limit: 1,
    })

    const [variant, setVariant] = useState("")

    const collectionProductProps = {
        products,
        variant,
        setVariant,
    }

    return (
        <Page>
            <section className='bg-white p-16 rounded shadow-lg'>
                {isLoading ? (
                    <IsLoading />
                ) : (
                    products?.length ?
                        <CollectionProducts {...collectionProductProps} />
                        : <div>No Collection items</div>
                )}
            </section>
        </Page>
    )
}

function IsLoading() {
    return <div>Loading...</div>
}

function CollectionProducts({ products, variant, setVariant }: any) {
    const [isOpen, setIsOpen] = useState(false)

    const { cart, addCartItem, setEmail, getCartVariantCurrencyCode } = useCartManagement()

    async function handleAddEmail(event: any) {
        event.preventDefault()
        const email = event.target.elements["email"].value
        setEmail(email)
    }

    function handleAddItem() {
        addCartItem(variant.id, 1)
        setIsOpen(false)
    }

    const code = getCartVariantCurrencyCode()

    return (
        <section className='grid grid-cols-[1fr,2fr] gap-8'>
            <section className='flex flex-col justify-center items-center gap-10 border-b-2 pb-10'>
                <img src={products[0]?.thumbnail} className='h-96 rounded' />
                <h2 className='text-3xl font-semibold'>{products[0].title}</h2>
                <p>{products[0]?.subtitle}</p>
            </section>
            <Grid>
                {products[0].variants.map((variant, index) =>
                    <button
                        key={index}
                        className={`p-5 hover:bg-blue-200 rounded font-semibold underline ${variant === variant.id ? "bg-blue-400" : "bg-zinc-100"}`}
                        onClick={() => {
                            setVariant(variant)
                            setIsOpen(true)
                        }}
                    >
                        {variant.title}
                    </button>)}
            </Grid>
            <Modal title="Space selection" isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <img src={products[0]?.thumbnail} className='h-80 rounded' />
                <section className='flex justify-between w-full text-xs'>
                    <h2>{`space: ${variant.title}`}</h2>
                    <h2>view is apporximated</h2>
                </section>
                <section className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold'>{products[0].title}</h2>
                    <p>{products[0]?.subtitle}</p>
                </section>

                <section className='flex flex-col gap-2'>
                    <h2 className='font-semibold underline'>Total price:</h2>
                    <p>{variant && variant?.prices?.find((price: any) => price.currency_code === code)?.amount}</p>
                </section>
                {!cart?.email && (
                    <section className="flex flex-col gap-2">
                        <p className='text-xs text-red-600'>*Please add your email to add items to your cart</p>
                        <form className="flex flex-col gap-2 items-start" onSubmit={handleAddEmail}>
                            <label>Email</label>
                            <input className="border-2 border-zinc-100 pl-3 h-10 w-full rounded" type="email" name="email" placeholder='Enter your email...' />
                            <button type="submit" className="rounded bg-cyan-200 w-full py-2">Add email</button>
                        </form>
                    </section>

                )}
                {cart?.email && <button onClick={handleAddItem} className='w-full bg-cyan-200 rounded py-2' type="button">Add item to cart</button>}
            </Modal>
        </section>
    )
}

function Grid({ children }: { children: ReactNode }): ReactNode {
    return (
        <section className="grid grid-cols-3 gap-4">{children}</section>
    )
}
