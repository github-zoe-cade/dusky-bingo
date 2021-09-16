import styled from "styled-components"

import { BingoItem } from "../types/BingoItem"
import CrossIcon from "../assets/cross.png"

import theme from "./theme"
import { useState } from "react"

const Container = styled.div<{ done: boolean }>`
  border: 3px solid ${theme.colors.blue};
  padding: 2rem;
  margin: -2px;
  color: ${({ done }) => (done ? theme.colors.blue : theme.colors.green)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.15s ease;
  outline-color: ${theme.colors.violet};

  &:hover,
  &:active {
    opacity: 0.8;
  }
`

const Cross = styled.div<{ done: boolean; isHover: boolean }>`
  position: absolute;
  width: 4rem;
  height: 4rem;
  background: ${theme.colors.green};
  mask: url(${CrossIcon}) center/contain;
  transition: opacity 0.3s ease;
  opacity: ${({ done, isHover }) => (done ? 1 : isHover ? 0.2 : 0)};
  animation-name: ${({ done }) => done && "appear"};
  animation-duration: 0.3s;

  @keyframes appear {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(1.15);
    }
    66% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`

interface GridItemProps {
  item: BingoItem
  toggleItem: (item: BingoItem) => void
}

export const GridItem = ({ item, toggleItem }: GridItemProps): JSX.Element => {
  const [isHover, setIsHover] = useState(false)
  return (
    <Container
      tabIndex={0}
      done={item.done}
      onClick={() => toggleItem(item)}
      onKeyPress={(e) => (e.key === "Enter" || e.key === " ") && toggleItem(item)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Cross done={item.done} isHover={isHover} />
      {item.text}
    </Container>
  )
}
