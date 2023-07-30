"use server"

import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"

export async function getWalletBalances(address: string, chain: EvmChain) {
  try {
    const walletBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    })

    return walletBalances.raw
  } catch (error: any) {
    console.log(error)
  }
}
