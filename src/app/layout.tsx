"use client"
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider, MedusaProvider } from "medusa-react"
import { medusaClient } from "@/config";
import { QueryClient } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient()
const inter = Inter({ subsets: ["latin"] });

console.log("medusaClient : ", medusaClient)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MedusaProvider
        medusaClient={medusaClient}
        queryClientProviderProps={{ client: queryClient }}
        baseUrl="http://localhost:9000"
      >
        <CartProvider>
          <body className={inter.className}>{children}</body>
        </CartProvider>
      </MedusaProvider>
    </html>
  );
}
