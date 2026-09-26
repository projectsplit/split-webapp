import styled from 'styled-components';

export const StyledInputAndErrorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .errorMsg {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.direction.owe};
    display: flex;
    justify-content: end;
  }
`;
