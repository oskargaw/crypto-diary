import { DecentralizedWalletBalance } from "@/actions/getWalletBalances"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

import { TokenList } from "./TokenList"
import { Button } from "./ui/Button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/Card"

interface Props {
  tokenList: DecentralizedWalletBalance
}

const TAB_ID_DECENTRALIZED = "decentralized"
const TAB_ID_CENTRALIZED = "centralized"

export function TokenBalancesCard({ tokenList }: Props) {
  return (
    <Card className="h-fit w-[500px]">
      <Tabs defaultValue={TAB_ID_DECENTRALIZED}>
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={TAB_ID_DECENTRALIZED}>
              Decentralized
            </TabsTrigger>
            <TabsTrigger value={TAB_ID_CENTRALIZED}>Centralized</TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value={TAB_ID_DECENTRALIZED}>
          <CardContent className="max-h-[50vh]">
            <TokenList tokenList={tokenList} />
          </CardContent>
        </TabsContent>

        <TabsContent value={TAB_ID_CENTRALIZED}>
          <CardContent className="max-h-[50vh]">
            <TokenList tokenList={tokenList} />
          </CardContent>
        </TabsContent>

        <CardFooter>
          <Button
            size="xl"
            className="w-[60%] rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-zinc-800"
          >
            Show more
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  )
}
