import { formatUnits } from "viem"

import { toLocaleString } from "@/helpers/format"
import { DecentralizedWalletBalance } from "@/actions/getWalletBalances"

interface Props {
  tokenList: DecentralizedWalletBalance
}

export function TokenList({ tokenList }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {tokenList?.map(({ name, symbol, balance, decimals, token_address }) => (
        <div
          key={token_address}
          className="grid grid-cols-2 content-center rounded-lg p-4 shadow-lg"
        >
          <div className="grid grid-cols-card-list-item-first-half items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-white" />
            <div className="text-slate-200">{name}</div>
            <div className="text-amber-400">{symbol}</div>
          </div>

          <div className="self-center justify-self-end text-slate-200">
            {toLocaleString(formatUnits(BigInt(balance), decimals), 2, 4)}
          </div>
        </div>
      ))}
    </div>
  )
}
