import { formatUnits } from "viem"

import { toLocaleString } from "@/helpers/format"
import {
  BinanceWalletBalance,
  DecentralizedWalletBalance,
} from "@/actions/getWalletBalances"

interface Props {
  centralizedTokenBalances?: BinanceWalletBalance
  decentralizedTokenBalances?: DecentralizedWalletBalance
}

export function TokenList({
  centralizedTokenBalances,
  decentralizedTokenBalances,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {decentralizedTokenBalances
        ? decentralizedTokenBalances?.map(
            ({ name, symbol, balance, decimals, token_address }) => (
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
            )
          )
        : centralizedTokenBalances?.map(({ asset, free }) => (
            <div
              key={asset}
              className="grid grid-cols-2 content-center rounded-lg p-4 shadow-lg"
            >
              <div className="grid grid-cols-card-list-item-first-half items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-white" />
                <div className="text-slate-200">{asset}</div>
                <div className="text-amber-400">{asset}</div>
              </div>

              <div className="self-center justify-self-end text-slate-200">
                {toLocaleString(free, 2, 4)}
              </div>
            </div>
          ))}
    </div>
  )
}
