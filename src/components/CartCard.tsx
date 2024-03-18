import { useRegion } from "medusa-react"

export default function CartCard({ cart }: { cart: any }) {

    const { region } = useRegion(cart?.region_id)

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-bold">Cart</h2>
            <p><strong>ID:</strong> {!!cart?.id ? cart?.id : undefined}</p>
            <p><strong>EMAIL:</strong> {!!cart?.email ? cart?.email : undefined}</p>
            <p><strong>ADDRESS ID:</strong> {!!cart?.shipping_address_id ? cart.shipping_address_id! : undefined}</p>
            <p><strong>ITEMS IN CART:</strong> {cart?.items.length || 0}</p>
            <p><strong>Region:</strong> {region?.name}</p>
            <p><strong>Country Code:</strong>nothing</p>
            {/* <p><strong>Payment session:</strong>{cart?.payment_session}</p> */}
        </div>
    )
}