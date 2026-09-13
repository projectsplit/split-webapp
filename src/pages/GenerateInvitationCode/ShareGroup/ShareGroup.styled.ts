import styled from 'styled-components';

export const StyledShareGroup = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  .shareScroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space.s20};
    padding: ${({ theme }) =>
      `${theme.space.s4} ${theme.space.s20} ${theme.space.s24}`};

    > * {
      flex-shrink: 0;
    }
  }

  .promptMessage {
    max-width: 320px;
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    text-align: center;
    text-wrap: pretty;

    .groupName {
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
    }
  }

  .qrCodeContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min(260px, 70vw);
    aspect-ratio: 1;
  }

  .qrCode {
    display: flex;
    width: 100%;

    svg,
    canvas {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .codeCard {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    padding: ${({ theme }) => `${theme.space.s16} ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};

    .cardLabel {
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .code {
      max-width: 100%;
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.figure.card};
      font-weight: ${({ theme }) => theme.weight.medium};
      letter-spacing: 0.06em;
      color: ${({ theme }) => theme.ink.primary};
      overflow-wrap: anywhere;
      text-align: center;
    }

    .expires {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s6};
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};

      .timeLeft {
        font-family: ${({ theme }) => theme.font.mono};
        word-spacing: -0.4em;
      }

      &.expired {
        color: ${({ theme }) => theme.direction.owe};
      }

      .warning {
        display: flex;
        font-size: ${({ theme }) => theme.icon.xs};
      }
    }

    button {
      width: 100%;
    }
  }

  .emptyState {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s16};
    flex: 1;
    padding: ${({ theme }) => `${theme.space.s24} 0`};

    .msg {
      font-size: ${({ theme }) => theme.size.s13};
      color: ${({ theme }) => theme.ink.tertiary};
      text-align: center;
    }

    .icon {
      display: flex;
      font-size: 56px;
      color: ${({ theme }) => theme.surface.mark};
    }
  }

  .spinnerBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min(260px, 70vw);
    aspect-ratio: 1;
  }

  .footer {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s20} 22px`};
    background-color: ${({ theme }) => theme.surface.footer};
    border-top: 1px solid ${({ theme }) => theme.surface.raisedHigh};

    button {
      width: 100%;
      padding: ${({ theme }) => `${theme.space.s14} 0`};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      font-size: ${({ theme }) => theme.size.s15};
    }
  }
`;
