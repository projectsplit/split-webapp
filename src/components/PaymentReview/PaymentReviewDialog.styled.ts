import styled from 'styled-components';
import {
  formScrollStyles,
  fullScreenSurfaceStyles,
} from '@/styles/fullScreenSurface';
import { sheetHeaderStyles } from '@/styles/sheetHeader';
import { formFooterStyles } from '@/styles/formFooter';

export const StyledPaymentReviewDialog = styled.div`
  ${fullScreenSurfaceStyles}

  /* The list's own rules are all scoped to .review. The currency sheet opens inside this surface so
     that it sits above it, and its own .header and .currency would otherwise pick these up. */
  .review {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;

    ${sheetHeaderStyles}
    ${formScrollStyles}

    .formScroll {
      gap: ${({ theme }) => theme.space.s10};
    }

    .intro {
      margin: 0 0 ${({ theme }) => theme.space.s6};
      font-size: ${({ theme }) => theme.size.s13};
      line-height: 1.6;
      color: ${({ theme }) => theme.ink.secondary};
    }

    .row {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      column-gap: ${({ theme }) => theme.space.s10};
      padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.surface};
      background-color: ${({ theme }) => theme.surface.card};
    }

    .row.selected {
      border-color: ${({ theme }) => theme.accent.you.tintBorder};
      background-color: ${({ theme }) => theme.surface.raised};
    }

    .tick {
      display: flex;
      align-items: flex-start;
      margin: 0;
      padding: ${({ theme }) => `${theme.space.s4} 0 0`};
      border: none;
      background: none;
      color: ${({ theme }) => theme.ink.tertiary};
      font-size: ${({ theme }) => theme.icon.lg};
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .row.selected .tick {
      color: ${({ theme }) => theme.accent.you.fill};
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s6};
      min-width: 0;
    }

    .mainLine {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s8};
    }

    .description {
      flex: 1;
      min-width: 0;
      padding: ${({ theme }) => `${theme.space.s4} 0`};
      border: none;
      outline: none;
      background: transparent;
      color: ${({ theme }) => theme.ink.primary};
      font-family: inherit;
      font-size: ${({ theme }) => theme.size.s16};
      font-weight: ${({ theme }) => theme.weight.medium};

      &::placeholder {
        color: ${({ theme }) => theme.ink.tertiary};
        opacity: 1;
      }
    }

    .money {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-shrink: 0;
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.control};
      background-color: ${({ theme }) => theme.surface.page};
      transition: border-color 0.15s;

      &:focus-within {
        border-color: ${({ theme }) => theme.accent.you.ink};
      }
    }

    .symbol {
      display: flex;
      align-items: center;
      padding: ${({ theme }) =>
        `${theme.space.s6} ${theme.space.s4} ${theme.space.s6} ${theme.space.s8}`};
      border: none;
      background: none;
      color: ${({ theme }) => theme.ink.secondary};
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s12};
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .symbol.checkThis {
      color: ${({ theme }) => theme.state.locked};
    }

    .amount {
      box-sizing: border-box;
      width: 84px;
      padding: ${({ theme }) =>
        `${theme.space.s6} ${theme.space.s8} ${theme.space.s6} ${theme.space.s2}`};
      border: none;
      outline: none;
      background: transparent;
      color: ${({ theme }) => theme.accent.you.inkRow};
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s16};
      text-align: right;

      &::placeholder {
        color: ${({ theme }) => theme.ink.tertiary};
        opacity: 1;
      }
    }

    .row:not(.selected) .description,
    .row:not(.selected) .amount {
      color: ${({ theme }) => theme.ink.secondary};
    }

    .meta {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .note {
      align-self: flex-start;
      max-width: 100%;
      box-sizing: border-box;
      padding: ${({ theme }) => `${theme.space.s2} ${theme.space.s6}`};
      border-radius: ${({ theme }) => theme.radius.chip};
      background-color: ${({ theme }) => theme.surface.raisedHigh};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.medium};
      overflow-wrap: anywhere;
    }

    .note.warning {
      color: ${({ theme }) => theme.state.locked};
    }

    .source {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      overflow-wrap: anywhere;
      font-size: ${({ theme }) => theme.size.s12};
      line-height: 1.5;
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .error {
      font-size: ${({ theme }) => theme.size.s12};
      line-height: 1.5;
      color: ${({ theme }) => theme.direction.owe};
    }

    .empty {
      margin: auto 0;
      text-align: center;
      font-size: ${({ theme }) => theme.size.s14};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .footer {
      ${formFooterStyles}
    }
  }
`;
