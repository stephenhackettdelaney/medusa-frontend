// hooks/useCartManagement.js
import { useEffect, useCallback } from 'react';
import { useCart, useGetCart, useCreateLineItem, useAddShippingMethodToCart, useCreatePaymentSession, useCompleteCart, useRegion } from 'medusa-react';

export const useCartManagement = () => {
    const cartId = localStorage.getItem("cartId");
    const { cart, setCart, createCart, updateCart } = useCart();
    const { cart: existingCart, isLoading } = useGetCart(cartId || "");
    // does protecting this work ??
    const createLineItem = useCreateLineItem(cartId || "")
    const addShippingMethod = useAddShippingMethodToCart(cart.id)
    const createPaymentSession = useCreatePaymentSession(cart.id)
    const completeCart = useCompleteCart(cart.id)

    const { region } = useRegion(cart?.region_id || "")

    function getCartVariantCurrencyCode() {
        return region?.currency_code ? region?.currency_code : null
    }

    const createNewCart = useCallback(() => {
        createCart.mutate({}, {
            onSuccess: ({ cart }) => {
                localStorage.setItem("cartId", cart.id);
                setCart(cart);
            },
            onError: (error) => {
                console.error("createNewCartTwo create", error);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Create new cart on init
    useEffect(() => {
        if (!cartId) {
            createNewCart();
        }
    }, [cartId, createNewCart]);

    // Retrieve existing cart
    useEffect(() => {
        if (cartId && existingCart) {
            setCart(existingCart);
        }
    }, [cartId, existingCart, setCart]);

    const setEmail = useCallback((email: string) => {
        updateCart.mutate({
            email,
        }, {
            onSuccess: ({ cart }) => setCart(cart),
            onError: (error) => console.error("change email error : ", error),
        });
    }, [updateCart, setCart]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    function addCartItem(variant_id: string, quantity: number) {
        createLineItem.mutate({
            variant_id,
            quantity,
        }, {
            onSuccess: ({ cart }) => {
                setCart(cart)
            },
            onError: error => console.warn("add product error : ", error)
        })
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    // REGION

    const changeRegionId = (event: any) => {
        const region_id = event.target.value

        updateCart.mutate({
            region_id,
        },
            {
                onSuccess: ({ cart }) => {
                    setCart(cart)
                },
                onError: error => console.warn("region id error : ", error)
            })
    }

    function setShippingAddress(shipping_address: any) {
        updateCart.mutate({
            shipping_address,
        }, {
            onSuccess: ({ cart }) => {
                setCart(cart)
                // setCartCountryCode()
            },
            onError: error => console.warn("region id error : ", error)
        })
    }

    function setShippingOption(option_id: string) {
        addShippingMethod.mutate({
            option_id,
        }, {
            onSuccess: ({ cart }) => {
                setCart(cart)
                // setCartCountryCode()
            },
            onError: error => console.warn("region id error : ", error)
        })
    }

    function setCartCountryCode(country_code: string) {
        updateCart.mutate({
            country_code,
        }, {
            onSuccess: ({ cart }) => {
                setCart(cart)
            },
            onError: error => console.warn("region id error : ", error)
        })
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    // PAYMENTS

    function setPaymentSession(_onSuccess: any) {
        createPaymentSession.mutate(void 0, {
            onSuccess: ({ cart }) => {
                setCart(cart)
                _onSuccess()
            },
            onError: error => console.warn("setPaymentSession error : ", error)
        })
    }

    // Orders

    function completeOrder() {
        completeCart.mutate(void 0, {
            onSuccess: ({ data, type }) => {
                console.log(data.id, type)
                localStorage.removeItem("cartId")
            },
            onError: (error) => console.warn(error)
        })
    }




    return {
        cart,
        isLoading,
        addCartItem,
        setEmail,
        changeRegionId,
        setCartCountryCode,
        setShippingAddress,
        setShippingOption,
        setPaymentSession,
        setCart,
        completeOrder,
        createNewCart,
        getCartVariantCurrencyCode,
    };
}
