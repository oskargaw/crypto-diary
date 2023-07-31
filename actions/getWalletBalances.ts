"use server"

import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"

import { isGreaterThanZero } from "@/helpers/numbers"
import { binanceClient } from "@/lib/binance"

export async function getDecentralizedWalletBalances(
  address: string,
  chain: EvmChain
) {
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

export async function getBinanceWalletBalances() {
  try {
    const accountInfo = await binanceClient.accountInfo()

    const walletBalances = accountInfo.balances

    const walletBalancesGreaterThanZero = walletBalances.filter(({ free }) =>
      isGreaterThanZero(free)
    )

    return walletBalancesGreaterThanZero
  } catch (error: any) {
    console.log(error)
  }
}
