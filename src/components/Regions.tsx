import React from "react"
import { useRegions, useUpdateCart } from "medusa-react"
import { useCartManagement } from "@/lib/hooks/useCartManagment"

const Regions = () => {
    const { regions, isLoading } = useRegions()

    const { cart, changeRegionId } = useCartManagement()

    return (
        <div className="mt-4">
            {isLoading && <span>Loading...</span>}
            {regions?.length && (
                <select className="p-3 rounded" onChange={changeRegionId}>
                    {regions.map((region) => (
                        <option selected={region.id === cart?.region_id} key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default Regions
