import { medusaClient } from "@/config";

export async function createNewCart() {
    return medusaClient.carts.create()
        .then(({ cart }) => {
            localStorage.setItem("cart_id", cart.id)
            return cart
        })
        .catch((err) => {
            console.log(err)
            return null
        })
}

export async function getCart(cartId: string) {
    return medusaClient.carts.retrieve(cartId).then(cart => cart)
}

