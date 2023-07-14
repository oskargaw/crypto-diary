import { RainbowKitProvider as RainbowKitProviderImported } from "@rainbow-me/rainbowkit"

import "@rainbow-me/rainbowkit/styles.css"

import { chains } from "./WagmiProvider"

interface Props {
  children: React.ReactNode
}

export function RainbowKitProvider({ children }: Props) {
  return (
    <RainbowKitProviderImported chains={chains} modalSize="compact">
      {children}
    </RainbowKitProviderImported>
  )
}
