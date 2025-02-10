import { SubmitButtonProps } from '../../interfaces'
import { StyledSubmitButton } from './SubmitButton.styled'


export default function SubmitButton({ children, onClick,submitButtonIsActive}: SubmitButtonProps) {

  return (
    <StyledSubmitButton onClick={onClick} submitButtonIsActive={submitButtonIsActive}  disabled={submitButtonIsActive === false}>
      {children}
    </StyledSubmitButton>
  )
}
