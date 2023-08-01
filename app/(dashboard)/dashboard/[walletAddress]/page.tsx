import { EvmChain } from "@moralisweb3/common-evm-utils"
import dayjs from "dayjs"
import { formatUnits } from "viem"

import { startMoralis } from "@/lib/moralis"
import { multiplyBigNumbers } from "@/helpers/numbers"
import { getTokenPrice } from "@/actions/getTokenPrice"
import {
  getBinanceWalletBalances,
  getDecentralizedWalletBalances,
} from "@/actions/getWalletBalances"
import { getDecentralizedWalletTransfers } from "@/actions/getWalletTransfers"

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
    <div>
      <div>Decentralized:</div>
      <div>
        {decentralizedWalletBalances?.map(
          ({ name, balance, decimals, token_address }) => (
            <div key={token_address}>{`${name}: ${formatUnits(
              BigInt(balance),
              decimals
            )}`}</div>
          )
        )}
      </div>

      <div>Binance:</div>
      <div>
        {binanceWalletBalances?.map(({ asset, free }) => (
          <div key={asset}>{`${asset} ${free}`}</div>
        ))}
      </div>

      <div>Buys:</div>
      <div>{renderTransfers(transfersBuy)}</div>

      <div>Sells:</div>
      <div>{renderTransfers(transfersSell)}</div>
    </div>
  )
}
