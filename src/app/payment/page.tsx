"use client"
import { useEffect } from "react"
import { Button, Page } from "@/components"
import { useCartManagement } from "@/lib/hooks/useCartManagment"
import { useRouter } from "next/navigation"

export default function Payment() {
    const { cart, setPaymentSession, completeOrder } = useCartManagement()
    const router = useRouter()


    function onOrderSuccess() {
        router.push("/")
        localStorage.removeItem("cartId")
    }

    useEffect(() => {
        if (!cart?.payment_session) {
            setPaymentSession(onOrderSuccess)
        }
    }, [])



    const verb = cart?.items?.length > 1 ? "items" : "item"

    return (
        <Page>
            <section className="flex flex-col gap-8 shadow-lg bg-white w-full p-5 rounded">
                <h2 className="text-2xl font-semibold text-center">Order details</h2>
                <div>
                    {cart?.items.map((item, index: number) => {
                        return (
                            <section className="flex flex-col items-center gap-2" key={index}>
                                <img src={item.thumbnail} className='h-44 rounded' />
                                <h2>{item.title}</h2>
                                <p>{item.variant.title}</p>
                                <p>{item.variant.title}</p>
                            </section>
                        )
                    })}
                </div>
                <section className="flex flex-col items-center gap-2" >
                    <h2 className="font-semibold underline">Order Totals</h2>
                    <p><strong>Items Total:{' '}</strong>{cart.subtotal}</p>
                    <p><strong>Shipping Total:{' '}</strong>{cart.shipping_total}</p>
                    <p><strong>Order Total:{' '}</strong>{cart.total}</p>
                </section>
            </section>
            <Button onClick={completeOrder}>{`Order ${verb}`}</Button>
        </Page>
    )
}