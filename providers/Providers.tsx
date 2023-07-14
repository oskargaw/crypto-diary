"use client"

import React from "react"

import { RainbowKitProvider } from "./RainbowKitProvider"
import { WagmiProvider } from "./WagmiProvider"

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <WagmiProvider>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  )
}
