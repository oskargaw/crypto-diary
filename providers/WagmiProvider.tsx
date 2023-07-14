import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
  avalanche,
  avalancheFuji,
  mainnet,
  polygon,
  polygonMumbai,
} from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

interface Props {
  children: React.ReactNode
}

const { chains, publicClient } = configureChains(
  [mainnet, polygon, polygonMumbai, avalanche, avalancheFuji],
  [publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: "Crypto Diary",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function WagmiProvider({ children }: Props) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}

export { WagmiProvider, chains }
