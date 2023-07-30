"use client"

import { ReactElement, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

export function ConnectWallet(): ReactElement {
  // Hooks
  const router = useRouter()
  const { address: account } = useAccount()

  // Effects
  useEffect(() => {
    if (account) {
      router.push(`/dashboard/${account}`)
    }
  }, [account, router])

  return <ConnectButton />
}
