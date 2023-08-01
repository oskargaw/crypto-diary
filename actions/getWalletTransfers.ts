"use server"

import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"

export const getDecentralizedWalletTransfers = async (
  address: string,
  chain: EvmChain
) => {
  try {
    const walletTransfers = await Moralis.EvmApi.token.getWalletTokenTransfers({
      address,
      chain,
    })

    return walletTransfers.raw.result
  } catch (error) {
    console.error(error)
  }
}
