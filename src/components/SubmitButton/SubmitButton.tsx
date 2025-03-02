import { SubmitButtonProps } from '../../interfaces'
import { StyledSubmitButton } from './SubmitButton.styled'


export default function SubmitButton({ children, onClick, disabled,color,backgroundColor}: SubmitButtonProps) {

  return (
    <StyledSubmitButton color={color} backgroundColor={backgroundColor} onClick={onClick} disabled={disabled}>
      {children}
    </StyledSubmitButton>
  )
}
