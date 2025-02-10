import styled from 'styled-components'
import { InputProps } from '../../interfaces'


export const StyledInput = styled.input<InputProps>`
  border-radius: 4px;
  padding: 0.8rem;
  outline: none;
  color: white;
  background-color: ${({ theme }) => theme.layer2};
  border-style: none;
  font-size: 18px;
  border: ${({ error, theme }) => (error ? `1px solid  ${theme.pink}` : 'none')};
  
`


/* &:focus {
  outline: none;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.pink};
} */