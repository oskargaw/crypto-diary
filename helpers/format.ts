export const toLocaleString = (
  value: string,
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
) =>
  Number(value).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  })
