import { mathjs } from "@/lib/math"

export const isGreaterThanZero = (value: string) =>
  mathjs.bignumber(value).greaterThan(0)

export const addBigNumbers = (firstValue: string, secondValue: string) =>
  mathjs
    .chain(mathjs.bignumber(firstValue))
    .add(mathjs.bignumber(secondValue))
    .format({ notation: "fixed" })
    .done()

export const multiplyBigNumbers = (firstValue: string, secondValue: string) =>
  mathjs
    .chain(mathjs.bignumber(firstValue))
    .multiply(mathjs.bignumber(secondValue))
    .format({ notation: "fixed" })
    .done()
