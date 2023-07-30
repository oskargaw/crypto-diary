import { EvmChain } from "@moralisweb3/common-evm-utils"
import Moralis from "moralis"
import { formatUnits } from "viem"

import { getWalletBalances } from "@/actions/getWalletBalances"

interface Params {
  walletAddress: string
}

export default async function Dashboard({ params }: { params: Params }) {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    })
  }

  const walletBalances = await getWalletBalances(
    params.walletAddress,
    EvmChain.ETHEREUM
  )

  return (
    <div>
      {walletBalances?.map(({ name, balance, decimals, token_address }) => (
        <div key={token_address}>{`${name}: ${formatUnits(
          BigInt(balance),
          decimals
        )}`}</div>
      ))}
    </div>
  )
}
