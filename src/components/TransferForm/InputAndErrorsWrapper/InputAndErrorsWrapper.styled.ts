import styled from 'styled-components';

export const StyledInputAndErrorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .errorMsg {
    font-size: 12px;
    color: ${({ theme }) => theme.errorColor};
    display: flex;
    justify-content: end;
  }
`;
