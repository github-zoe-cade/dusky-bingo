import React, { useEffect, useState } from "react"
import styled from "styled-components"
import seedrandom from "seedrandom"

import Background from "./assets/Background.png"
import { data } from "./bingoItemList"

import { Item, BingoItem, RankedBingoItem, UncompleteBingoItem } from "./types/BingoItem"
import theme from "./Bingo/theme"
import { GridItem } from "./Bingo/GridItem"
import { computeCombinations } from "./Bingo/helpers"
import { Menu } from "./Bingo/Menu"

const Container = styled.div`
  background-image: url(${Background});
  height: 100vh;
  overflow: hidden;
  background-size: cover;
`

const Title = styled.h1`
  text-align: center;
  color: ${theme.colors.green};
  font-family: monospace;
  padding: 2rem 2rem 1rem;
  font-size: 2.5rem;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 3rem;
  margin: 2rem 5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background-color: ${theme.colors.violet};
  border: 3px solid ${theme.colors.blue};
  position: relative;
`

const BingoContainer = styled.div`
  position: absolute;
  font-size: 5rem;
  color: ${theme.colors.green};
  background: #00000073;
  padding: 1rem 2rem;
  border-radius: 5px;
  z-index: 1;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const nbRows = 4
const nbColums = 4
const bingoLength = nbColums * nbRows

const pickElements = function <T>(list: Array<T>, seed?: string): Array<T> {
  const random = !!seed ? seedrandom(seed) : Math.random
  return list.sort(() => random() - random()).slice(0, bingoLength)
}

const isItem = (item: Item | undefined): item is Item => {
  return !!item
}

export const Bingo = (): JSX.Element => {
  const initializeStatusForItems = (items: RankedBingoItem[]): UncompleteBingoItem[] =>
    items.map((x) => ({ ...x, done: false }))

  const addRankToItems = (items: Item[]): RankedBingoItem[] =>
    items.map((x, index) => ({ ...x, rank: index + 1 }))

  const sanitizeItems = (items: Item[]): BingoItem[] =>
    initializeStatusForItems(addRankToItems(items))
  const pickRandomItems = (): BingoItem[] => sanitizeItems(pickElements(data))
  const pickTodayItems = (): BingoItem[] =>
    sanitizeItems(pickElements(data, new Date().toDateString()))

  const [items, setItems] = useState<BingoItem[]>([])
  const [bingo, setBingo] = useState(false)

  const shuffle = () => {
    setItems(pickRandomItems())
    setBingo(false)
    window.history.replaceState({}, "", "/")
  }

  useEffect(() => {
    const route = window.location.pathname
    if (route === "/today") {
      return setItems(pickTodayItems())
    }

    const params = new URLSearchParams(window.location.search)
    const ids = params.get("ids")

    if (ids) {
      const itemsFromUrl: Item[] = ids.split(",").reduce((memo: Item[], id) => {
        const item = data.find((item: Item) => item.id === Number(id))
        return isItem(item) ? [...memo, item] : memo
      }, [])

      if (itemsFromUrl.length !== 16) {
        return shuffle()
      }

      setItems(sanitizeItems(itemsFromUrl))
    } else {
      setItems(pickRandomItems())
    }
  }, [])

  useEffect(() => {
    const checkBingo = () => {
      const checkedItemRanks = items.filter((x) => x.done).map((x) => x.rank)
      const combinations = computeCombinations(nbRows, nbColums)

      if (combinations.some((comb) => comb.every((x) => checkedItemRanks.includes(x)))) {
        setBingo(true)
      } else {
        setBingo(false)
      }
    }
    checkBingo()
  }, [items])

  const toggleItem = (item: BingoItem) => {
    setItems(items.map((x) => (item.id === x.id ? { ...x, done: !x.done } : x)))
  }

  return (
    <Container>
      <Title>Dusky bingo</Title>
      <Content>
        <Menu
          items={items}
          initializeStatusForItems={initializeStatusForItems}
          shuffle={shuffle}
          setBingo={setBingo}
          setItems={setItems}
        />
        <Grid>
          {items.map(
            (item): React.ReactNode => (
              <GridItem key={item.id} item={item} toggleItem={toggleItem} />
            )
          )}
          {bingo && <BingoContainer>Bingo</BingoContainer>}
        </Grid>
      </Content>
    </Container>
  )
}
