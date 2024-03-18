"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useCollections } from "medusa-react"

import { Page } from "@/components"


const ProductCollections = () => {

    const { collections, isLoading } = useCollections()

    return (
        <Page>
            {isLoading && <span>Loading...</span>}
            {collections && collections.length === 0 && (
                <span>No Product Collections</span>
            )}
            <section className="grid grid-cols-[300px,3fr,1fr] p-5 gap-5 bg-white rounded">
                <div className="flex justify-center items-center bg-zinc-100">
                    <h2>FILTER FUNCTIONS</h2>
                </div>
                <div className="bg-white">
                    {collections && collections.length > 0 && (
                        <ul className="grid grid-cols-2 gap-4">
                            {collections.map((collection) => (
                                <li className="bg-zinc-100 p-16 text-center hover:bg-blue-200 font-semibold underline" key={collection.id}><Link href={`/collections/plots/${collection.id}`}>{collection.title}</Link></li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex justify-center items-center bg-zinc-100">
                    <h2>SORTED VIEWING</h2>
                </div>
            </section>

        </Page>
    )
}

export default ProductCollections
