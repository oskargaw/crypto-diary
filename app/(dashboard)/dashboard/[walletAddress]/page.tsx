import { EvmChain } from "@moralisweb3/common-evm-utils"
import { formatUnits } from "viem"

import {
  getBinanceWalletBalances,
  getDecentralizedWalletBalances,
} from "@/actions/getWalletBalances"
import { startMoralis } from "@/lib/moralis"

interface Params {
  walletAddress: string
}

export default async function Dashboard({ params }: { params: Params }) {
  startMoralis()

  const decentralizedWalletBalances = await getDecentralizedWalletBalances(
    params.walletAddress,
    EvmChain.ETHEREUM
  )

  const binanceWalletBalances = await getBinanceWalletBalances()

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
    </div>
  )
}
