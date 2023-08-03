import { EvmChain } from "@moralisweb3/common-evm-utils"
import dayjs from "dayjs"

import { startMoralis } from "@/lib/moralis"
import { multiplyBigNumbers } from "@/helpers/numbers"
import { getTokenPrice } from "@/actions/getTokenPrice"
import {
  getBinanceWalletBalances,
  getDecentralizedWalletBalances,
} from "@/actions/getWalletBalances"
import { getDecentralizedWalletTransfers } from "@/actions/getWalletTransfers"

import { TokenBalancesCard } from "@/components/TokenBalancesCard"

interface Params {
  walletAddress: string
}

export default async function Dashboard({ params }: { params: Params }) {
  // Config
  startMoralis()

  // Fetching
  const decentralizedWalletBalances = await getDecentralizedWalletBalances(
    params.walletAddress,
    EvmChain.ETHEREUM
  )

  const binanceWalletBalances = await getBinanceWalletBalances()

  const decentralizedWalletTransfers = await getDecentralizedWalletTransfers(
    params.walletAddress,
    EvmChain.ETHEREUM
  )

  // Constants
  const transfersBuy = decentralizedWalletTransfers?.filter(
    ({ to_address }) =>
      to_address.toLowerCase() === params.walletAddress.toLowerCase()
  )

  const transfersSell = decentralizedWalletTransfers?.filter(
    ({ from_address }) =>
      from_address.toLowerCase() === params.walletAddress.toLowerCase()
  )

  // Helpers
  const calculateTokenValue = async (
    address: string,
    valueWithDecimals: string,
    blockNumber: string
  ) => {
    const tokenPrice = await getTokenPrice(
      address,
      EvmChain.ETHEREUM,
      blockNumber
    )

    const tokenValue = multiplyBigNumbers(
      valueWithDecimals,
      tokenPrice?.toString() ?? "0"
    )

    return tokenValue
  }

  const renderTransfers = (transfers: typeof decentralizedWalletTransfers) =>
    transfers?.map(
      ({
        address,
        token_name,
        token_symbol,
        block_number,
        block_timestamp,
        value_decimal,
      }) => (
        <>
          <div>Name: {token_name}</div>
          <div>Symbol: {token_symbol}</div>
          <div>
            Date: {dayjs(block_timestamp).format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <div>Amount: {value_decimal as string}</div>
          <div>
            Price:{" "}
            {calculateTokenValue(
              address,
              value_decimal as string,
              block_number
            )}
          </div>
        </>
      )
    )

  return (
    <div className="flex h-screen w-screen justify-end p-10">
      <TokenBalancesCard
        centralizedTokenBalances={binanceWalletBalances}
        decentralizedTokenBalances={decentralizedWalletBalances}
      />

      <div>Buys:</div>
      <div>{renderTransfers(transfersBuy)}</div>

      <div>Sells:</div>
      <div>{renderTransfers(transfersSell)}</div>
    </div>
  )
}
