"use server"

import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"

import { binanceClient } from "@/lib/binance"
import { isGreaterThanZero } from "@/helpers/numbers"

export const getDecentralizedWalletBalances = async (
  address: string,
  chain: EvmChain
) => {
  try {
    const walletBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    })

    return walletBalances.raw
  } catch (error: any) {
    console.error(error)
  }
}

export const getBinanceWalletBalances = async () => {
  try {
    const accountInfo = await binanceClient.accountInfo()

    const walletBalances = accountInfo.balances

    const walletBalancesGreaterThanZero = walletBalances.filter(({ free }) =>
      isGreaterThanZero(free)
    )

    return walletBalancesGreaterThanZero
  } catch (error: any) {
    console.error(error)
  }
}
