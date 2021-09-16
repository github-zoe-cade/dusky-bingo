import React from "react"
import styled from "styled-components"
import theme from "./theme"

const StyledButton = styled.button<{ disabled: boolean }>`
  background: ${theme.colors.green};
  color: ${theme.colors.violet};
  border: none;
  font-size: 0.9rem;
  padding: 0.5rem;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:focus {
    outline-color: ${theme.colors.violet};
  }
`

type Props = {
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

export const Button = ({ disabled = false, onClick, children }: Props) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  )
}
