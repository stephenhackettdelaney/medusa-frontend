import { useEffect } from "react"
import { useCart } from "medusa-react"
export default function CartCard() {

    const { cart, setCart } = useCart()
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

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">Cart</h2>
            <p><strong>ID:</strong> {!!cart?.id ? cart?.id : undefined}</p>
            <p><strong>EMAIL:</strong> {!!cart?.email ? cart?.email : undefined}</p>
            <p><strong>ADDRESS ID:</strong> {!!cart?.shipping_address_id ? cart.shipping_address_id! : undefined}</p>
            <p><strong>ITEMS IN CART:</strong> {cart?.items.length || 0}</p>
        </div>
    )
}