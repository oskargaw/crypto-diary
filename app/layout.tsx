import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

import { cn } from "@/lib/utils"

import "@rainbow-me/rainbowkit/styles.css"

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
      <body
        className={cn(
          "h-screen bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700",
          inter.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
