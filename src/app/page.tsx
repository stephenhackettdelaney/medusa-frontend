"use client"
import Link from "next/link";
import { Products, Cart } from "@/components";

export default function Home() {

  return (
    <main className="relative flex flex-col gap-24 min-h-screen p-16">
      <Cart />
      {/* <Products /> */}
      <section className="flex gap-8 w-full">
        {LINKS.map(({ title, description, href }, index) => (
          <Link href={href} key={index} className="bg-white hover:bg-cyan-100 rounded py-10 px-5 w-full shadow-lg">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-xs">{description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

const LINKS = [
  {
    title: "Find An Obituary",
    description: "Find a loved one, share a memory, send a gift",
    href: "/collections"
  },
  {
    title: "Immediate Need",
    description: "A loved one has passed or is about to pass",
    href: "/collections"
  },
  {
    title: "Plan for the future",
    description: "Planning a funeral or cremation - made easy",
    href: "/collections"
  },

]
