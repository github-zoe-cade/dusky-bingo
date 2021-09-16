const computeRows = (nbRows: number, nbColumns: number): Array<number[]> => {
  let rows: Array<number[]> = []

  for (let i = 1; i <= nbRows * nbColumns; i += nbColumns) {
    rows = [...rows, Array.from({ length: nbColumns }).map((_, index) => index + i)]
  }

  return rows
}

const computeColumns = (nbRows: number, nbColumns: number): Array<number[]> => {
  let columns: Array<number[]> = []

  for (let i = 1; i <= nbColumns; i++) {
    columns = [...columns, Array.from({ length: nbRows }).map((_, index) => i + index * nbColumns)]
  }

  return columns
}

const computeDiagonales = (nbRows: number, nbColumns: number): Array<number[]> => {
  if (nbColumns !== nbRows) {
    return []
  }
  const rows = computeRows(nbRows, nbColumns)
  let d1: number[] = []
  let d2: number[] = []
  for (let i = 0; i < nbColumns; i++) {
    d1 = [...d1, rows[i][i]]
    d2 = [...d2, rows[i][nbColumns - i - 1]]
  }

  return [d1, d2]
}

export const computeCombinations = (nbRows: number, nbColumns: number): Array<number[]> => [
  ...computeRows(nbRows, nbColumns),
  ...computeColumns(nbRows, nbColumns),
  ...computeDiagonales(nbRows, nbColumns),
]
