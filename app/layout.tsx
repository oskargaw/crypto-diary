import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

import { Providers } from "@/providers/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Diary",
  description: "Track your web3 portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
