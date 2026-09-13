import styled from 'styled-components';
import { StyledBottomMenu } from '../../../components/Menus/Layouts/BottomMenu/BottomMenu.styled';

export const StyledSettleUpOptions = styled(StyledBottomMenu)`
  height: auto;

  .settleUpHeader {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .header {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
  }

  .settleUpNote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.secondary};
    text-wrap: pretty;
  }

  .settleUpOptions {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    max-height: 40vh;
    overflow-y: auto;
  }

  .settleUpOption {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.page};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .settleUpOption.clicked {
    border-color: ${({ theme }) => theme.surface.outline};
  }

  .optionCheck {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border: 1px solid ${({ theme }) => theme.surface.outline};
    border-radius: ${({ theme }) => theme.space.s6};
    font-size: ${({ theme }) => theme.size.s11};
  }

  .optionCheck.checked {
    border-color: transparent;
    background-color: ${({ theme }) => theme.ink.primary};
    color: ${({ theme }) => theme.surface.page};
  }

  .optionText {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s14};
    line-height: 1.45;

    .preposition {
      color: ${({ theme }) => theme.ink.secondary};
    }

    .name {
      font-weight: ${({ theme }) => theme.weight.medium};
    }
  }

  .optionAmount {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
  }

  .settleUpSummary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s2} ${theme.space.s2} 0`};

    .count {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .total {
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s13};
      font-weight: ${({ theme }) => theme.weight.medium};
    }
  }

  .settleUpButton {
    display: flex;
    flex-direction: column;
  }
`;
