import { SubmitButtonProps } from '../../interfaces'
import { StyledSubmitButton } from './SubmitButton.styled'


export default function SubmitButton({ children, onClick,submitbuttonisactive}: SubmitButtonProps) {

  return (
    <StyledSubmitButton onClick={onClick} submitbuttonisactive={submitbuttonisactive}  disabled={submitbuttonisactive === false}>
      {children}
    </StyledSubmitButton>
  )
}
