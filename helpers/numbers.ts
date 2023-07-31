import { mathjs } from "@/lib/math"

export const isGreaterThanZero = (value: string) =>
  mathjs.bignumber(value).greaterThan(0)
