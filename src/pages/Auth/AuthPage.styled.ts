import styled from 'styled-components';

export const StyledAuthPage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  padding: ${({ theme }) => `0 ${theme.space.s20}`};

  .loginBox {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border: none;
    padding: 0;

    .promptMsg {
      color: ${({ theme }) => theme.ink.secondary};
      padding-bottom: ${({ theme }) => theme.space.s16};
      white-space: initial;
      font-size: ${({ theme }) => theme.size.s13};
    }

    .controlsContainer {
      display: flex;
      flex-direction: column;

      .createAccountSignIn {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.space.s10};
      }

      .formError {
        height: 16px;
        line-height: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: ${({ theme }) => theme.space.s6};
        color: ${({ theme }) => theme.direction.owe};
        font-size: ${({ theme }) => theme.size.s12};
      }

      .inputBox {
        display: flex;
        flex-direction: column;
        margin-bottom: ${({ theme }) => theme.space.s14};
      }

      .or {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        gap: ${({ theme }) => theme.space.s12};
        padding: ${({ theme }) => `${theme.space.s14} 0`};
        font-size: ${({ theme }) => theme.size.s11};
        letter-spacing: 0.1em;
        color: ${({ theme }) => theme.ink.tertiary};

        &:after,
        &:before {
          content: '';
          display: block;
          background-color: ${({ theme }) => theme.surface.hairline};
          width: 100%;
          height: 1px;
        }
      }
    }
  }
`;
