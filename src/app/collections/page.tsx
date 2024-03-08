"use client"
import React from "react"
import { useCollections } from "medusa-react"

import Link from "next/link"

const ProductCollections = () => {
    const { collections, isLoading } = useCollections()

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {isLoading && <span>Loading...</span>}
            {collections && collections.length === 0 && (
                <span>No Product Collections</span>
            )}
            {collections && collections.length > 0 && (
                <ul className="grid grid-cols-2 gap-4">
                    {collections.map((collection) => (
                        <li className="border-2 border-purple-600 bg-purple-300 p-16" key={collection.id}><Link href={`/products/${collection.id}`}>{collection.title}</Link></li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ProductCollections
