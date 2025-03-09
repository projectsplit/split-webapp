import styled from 'styled-components'
import { InputProps } from '../../interfaces'


export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundcolor",
})<InputProps>`
  border-radius: 10px;
  padding: 0.8rem;
  outline: none;
  color: white;
  background-color: ${({ theme, backgroundcolor }) => backgroundcolor || theme.layer2};
  border-style: none;
  font-size: 18px;
  border: ${({ error, theme }) => (error ? `1px solid  ${theme.pink}` : 'none')};
 
`
