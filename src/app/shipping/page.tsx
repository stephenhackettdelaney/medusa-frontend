"use client"
import React from 'react'
import Link from 'next/link'
import { Button, Cart, Regions } from '@/components'
import { useCartManagement } from '@/lib/hooks/useCartManagment'
import { useForm } from 'react-hook-form'
import { useRegion } from 'medusa-react'

function Checkout() {
    const { cart, setCartCountryCode, setShippingAddress } = useCartManagement()
    const { region } = useRegion(cart.region_id)

    function handleOnSubmit(values) {
        setShippingAddress(values)
        setCartCountryCode(values.country_code)
    }

    return (
        <div className="flex min-h-screen flex-col max-w-5xl mx-auto py-16 gap-16">
            <section>
                <Cart />
                <Regions />
            </section>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold'>Shipping/Billable/Contact?</h2>
                <Form handleOnSubmit={handleOnSubmit} countries={region?.countries} />
                {cart?.shipping_address_id && <Link className='underline text-blue-500 text-center' href="/shippingOptions">Shipping options</Link>}
            </div>
        </div>

    )
}

function Form({ handleOnSubmit, countries }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => handleOnSubmit(data);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className='bg-white p-8 rounded w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <Input label="First Name" name="first_name" register={register} errors={errors} placeholder="Enter your first name..." />
            <Input label="Second Name" name="last_name" register={register} errors={errors} placeholder="Enter your second name..." />
            <section className='flex flex-col gap-2'>
                <label>Select country</label>
                <select className="p-3 rounded" {...register("country_code")} >
                    {countries?.map((country: any, index: number) => <option key={index} value={country.iso_2}>{country.display_name}</option>)}
                </select>
            </section>

            <Button type="submit">Submit</Button>
        </form>
    )
}

function Input({ label, name, register, errors, ...props }: { label: string, name: string, register: any, errors: any }) {
    return (
        <section className='flex flex-col gap-2'>
            <label className='capitalize'>{label}</label>
            <input className='pl-2 h-10 rounded border-2 border-zinc-400' {...register(name, { required: true })} {...props} />
            {errors.name && <span>This field is required</span>}
        </section>
    )
}

export default Checkout