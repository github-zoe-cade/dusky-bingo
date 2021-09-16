export interface BingoItem {
  readonly id: number
  readonly text: string
  readonly rank: number
  readonly done: boolean
}

export type Item = Pick<BingoItem, "id" | "text">
export type RankedBingoItem = Omit<BingoItem, "done">
export type UncompleteBingoItem = BingoItem & { done: false }
