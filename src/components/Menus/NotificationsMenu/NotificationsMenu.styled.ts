import { styled } from 'styled-components';

export const StyledNotificationsMenu = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.surface.page};

  .headerSeparator {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.surface.page};
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s10};
    }

    .info {
      flex: 1;
      min-width: 0;
      text-align: center;
      padding-left: 34px;
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
    }

    .closeButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      cursor: pointer;
      color: ${({ theme }) => theme.ink.secondary};

      .close {
        display: block;
        font-size: ${({ theme }) => theme.icon.lg};
      }
    }
  }

  .notifications {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s24}`};
  }

  .data {
    display: flex;
    flex-direction: column;
  }

  .sectionTitle {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.ink.tertiary};
    padding-top: ${({ theme }) => theme.space.s20};
    padding-bottom: ${({ theme }) => theme.space.s6};
  }

  .item,
  .activityItem {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s3};
    padding: ${({ theme }) => theme.space.s16};
    margin-top: ${({ theme }) => theme.space.s8};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .activityMain {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.s10};
  }

  .activityText {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s3};
    min-width: 0;
  }

  .activityTitle {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.semibold};
    color: ${({ theme }) => theme.ink.primary};
  }

  .activityBody {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.secondary};
    white-space: initial;
  }

  .activityDate {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .activityChevron {
    flex-shrink: 0;
    align-self: center;
    font-size: ${({ theme }) => theme.icon.sm};
    color: ${({ theme }) => theme.surface.mark};
  }

  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: ${({ theme }) => theme.space.s10};
    color: ${({ theme }) => theme.ink.tertiary};

    .icon {
      font-size: 56px;
      color: ${({ theme }) => theme.surface.raisedHigh};
    }
  }
`;
