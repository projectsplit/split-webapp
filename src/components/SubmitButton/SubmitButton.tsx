import { SubmitButtonProps } from '../../interfaces'
import { StyledSubmitButton } from './SubmitButton.styled'


export default function SubmitButton({ children, onClick,submitbuttonisactive, color,backgroundColor}: SubmitButtonProps) {

  return (
    <StyledSubmitButton color={color} backgroundColor={backgroundColor} onClick={onClick} submitbuttonisactive={submitbuttonisactive}  disabled={submitbuttonisactive === false}>
      {children}
    </StyledSubmitButton>
  )
}
