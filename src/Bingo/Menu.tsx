import { useEffect, useState } from "react"
import styled from "styled-components"
import theme from "./theme"

import { Button } from "./Button"
import { BingoItem, UncompleteBingoItem } from "../types/BingoItem"

const MenuTitle = styled.h2`
  text-align: center;
  color: ${theme.colors.green};
  font-family: monospace;
  font-size: 2rem;
  margin-top: 0.9rem;
  margin-bottom: 1rem;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

type Props = {
  items: BingoItem[]
  initializeStatusForItems: (items: BingoItem[]) => UncompleteBingoItem[]
  setBingo: (bingo: boolean) => void
  setItems: (items: BingoItem[]) => void
  shuffle: () => void
}

export const Menu = ({ items, initializeStatusForItems, setBingo, setItems, shuffle }: Props) => {
  const [urlShared, setUrlShared] = useState(false)

  useEffect(() => {
    if (urlShared) {
      setTimeout(() => setUrlShared(false), 800)
    }
  }, [urlShared])

  const reset = () => {
    setItems(initializeStatusForItems(items))
    setBingo(false)
  }

  const share = async () => {
    const orderedIds: number[] = items.sort((a, b) => a.rank - b.rank).map((x) => x.id)
    const url = new URL(window.location.origin)
    const params = new URLSearchParams(url.search)
    params.set("ids", orderedIds.toString())
    url.search = params.toString()

    await navigator.clipboard.writeText(url.toString())
    setUrlShared(true)
  }

  return (
    <MenuContainer>
      <MenuTitle>Actions</MenuTitle>
      <Button onClick={reset}>Remettre à zéro</Button>
      <Button onClick={shuffle}>Mélanger</Button>
      <Button onClick={share} disabled={urlShared}>
        {urlShared ? "Url copiée ✔" : "Partager la grille"}
      </Button>
      <Button onClick={() => window.location.replace("today")}>Grille du jour</Button>
    </MenuContainer>
  )
}
