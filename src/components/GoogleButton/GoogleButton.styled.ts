import styled from 'styled-components';
import { StyledSubmitButton } from '../SubmitButton/SubmitButton.styled';

export const StyledGoogleButton = styled(StyledSubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space.s10};
  padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s16}`};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  color: ${({ theme }) => theme.ink.primary};
  font-size: ${({ theme }) => theme.size.s14};
  font-weight: ${({ theme }) => theme.weight.medium};

  .googleLogo {
    width: 18px;
    height: 18px;
  }

  .prompt {
    text-align: center;
  }
`;
