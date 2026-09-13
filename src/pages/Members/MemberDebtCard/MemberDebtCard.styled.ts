import styled from 'styled-components';

interface StyledMemberDebtCardProps {
  isGuest: boolean;
  isLoggedUser: boolean;
}

export const StyledMemberDebtCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isGuest', 'isLoggedUser'].includes(prop),
})<StyledMemberDebtCardProps>`
  position: relative;
  padding: ${({ theme }) => theme.space.s16};
  border-radius: ${({ theme }) => theme.radius.surface};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};

  .preposition {
    color: ${({ theme }) => theme.ink.secondary};
    margin-top: ${({ theme }) => theme.space.s10};
  }

  .currencyOwes {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme }) => theme.direction.owe};
  }

  .currencyIsOwed {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme }) => theme.direction.owed};
  }

  .memberAvatar {
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

  .memberAvatar.you {
    background-color: ${({ theme }) => theme.accent.you.tint};
    border: 1px solid ${({ theme }) => theme.accent.you.tintBorder};
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .balanceRow {
    margin-top: ${({ theme }) => theme.space.s8};
  }

  .footerRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.space.s12};
    margin-top: ${({ theme }) => theme.space.s10};
  }

  .summaries {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s3};
    min-width: 0;
  }

  .memberHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
  }

  .nameRow {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};
    min-width: 0;
  }

  .memberName {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
    color: ${({ theme }) => theme.ink.primary};
  }

  .memberSummary {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .memberSummary .owingText {
    color: ${({ theme }) => theme.ink.secondary};
    white-space: nowrap;
  }

  .memberSummary .amount {
    font-family: ${({ theme }) => theme.font.mono};
    white-space: nowrap;
  }

  .memberSummary .amount.isOwed {
    color: ${({ theme }) => theme.direction.owed};
  }

  .memberSummary .amount.owes {
    color: ${({ theme }) => theme.direction.owe};
  }

  .memberSummary .checkmark {
    color: ${({ theme }) => theme.ink.tertiary};
    font-size: ${({ theme }) => theme.size.s13};
    vertical-align: -1px;
  }

  .totalSpent {
    line-height: 1.4;
    margin-right: auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};

    .amounts {
      font-family: ${({ theme }) => theme.font.mono};
      color: inherit;
    }
  }

  .guestChip {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding: ${({ theme }) => `${theme.space.s3} ${theme.space.s8}`};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s10};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .debtTree {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    margin: ${({ theme }) => `${theme.space.s12} 0 0 0`};

    ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s8};
      margin: 0 0 0 17px;
      padding-left: 0;
    }

    li {
      font-size: ${({ theme }) => theme.size.s13};
      margin-bottom: 0;
    }

    li::before {
      left: -17px;
      top: 9px;
      width: 9px;
    }

    li::after {
      left: -17px;
      top: -9px;
      height: 150%;
    }

    ul > li:last-child::after {
      height: 18px;
    }
  }

  .debtRow {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .debtWho {
    color: ${({ theme }) => theme.ink.secondary};

    strong {
      color: ${({ theme }) => theme.ink.primary};
      font-weight: ${({ theme }) => theme.weight.medium};
    }
  }

`;
