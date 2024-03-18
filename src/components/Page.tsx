import { type ReactNode } from "react";
import { Cart } from ".";
import { useParams, usePathname } from "next/navigation";


export default function Page({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const showCart = !["/payment"].includes(pathname)
    return (
        <main className="relative flex flex-col gap-16 min-h-screen p-16">
            {showCart && <Cart />}
            {children}
        </main>
    )
}