"use server"

import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"

export const getTokenPrice = async (
  address: string,
  chain: EvmChain,
  toBlock: string
) => {
  try {
    const tokenPrice = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain,
      toBlock: Number(toBlock),
    })

    return tokenPrice.raw.usdPrice
  } catch (error) {
    console.error(error)
  }
}
