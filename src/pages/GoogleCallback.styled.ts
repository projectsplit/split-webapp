import styled from 'styled-components';

export const StyledGoogleCallback = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.s10};
  width: 100%;
  height: 100dvh;
  padding: ${({ theme }) => `0 ${theme.space.s20}`};
  text-align: center;

  .statusIcon {
    display: block;
    margin-bottom: ${({ theme }) => theme.space.s4};
    font-size: 40px;
    color: ${({ theme }) => theme.ink.tertiary};

    &.success {
      color: ${({ theme }) => theme.direction.owed};
    }

    &.danger {
      color: ${({ theme }) => theme.direction.owe};
    }
  }

  .statusTitle {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .titleEmoji {
    display: inline-block;
    margin-left: 0.3em;
    font-size: 0.92em;
    line-height: 1;
    transform: translateY(0.06em);
  }

  .statusInfo {
    max-width: 280px;
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .statusAction {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    margin-top: ${({ theme }) => theme.space.s14};
  }
`;
