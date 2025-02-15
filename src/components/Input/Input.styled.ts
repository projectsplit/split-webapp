import styled from 'styled-components'
import { InputProps } from '../../interfaces'


export const StyledInput = styled.input<InputProps>`
  border-radius: 4px;
  padding: 0.8rem;
  outline: none;
  color: white;
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.layer2};
  border-style: none;
  font-size: 18px;
  border: ${({ error, theme }) => (error ? `1px solid  ${theme.pink}` : 'none')};
  
`
