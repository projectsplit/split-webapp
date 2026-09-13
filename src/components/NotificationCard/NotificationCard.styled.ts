import { styled } from 'styled-components';

export const StyledNotificationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s14};
  width: 100%;

  .mainMsg {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    font-size: ${({ theme }) => theme.size.s14};
    line-height: 1.45;
    color: ${({ theme }) => theme.ink.primary};
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s12};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .itemDate {
    margin-top: ${({ theme }) => theme.space.s3};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .message strong {
    color: ${({ theme }) => theme.ink.primary};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .actions {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s8};

    > * {
      flex: 1;
    }

    button {
      width: 100%;
      padding: 9px 0;
      font-size: ${({ theme }) => theme.size.s13};
    }
  }
  .msgText {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

`;
