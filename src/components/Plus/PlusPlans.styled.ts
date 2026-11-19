import styled from 'styled-components';

/**
 * The plan picker and, for a member, the plan they are on. Both wear the Plus mark's quiet metal
 * rather than the pink "you" accent: the chosen plan gets the mark's bright edge and its lifted
 * face, so the picker reads as part of Plus and not as another highlight on the page.
 */
export const StyledPlusPlans = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s12};

  .pitch,
  .terms,
  .unavailable {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .pitch {
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .loading {
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => `${theme.space.s16} 0`};
  }

  .plans {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
  }

  .plan {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    width: 100%;
    box-sizing: border-box;
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    border-radius: ${({ theme }) => theme.radius.surface};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    background-color: ${({ theme }) => theme.surface.raised};
    font-family: inherit;
    text-align: left;
    color: ${({ theme }) => theme.ink.primary};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      border-color 150ms,
      background-color 150ms;
  }

  .plan.selected {
    border-color: ${({ theme }) => theme.plus.edgeStrong};
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.plus.fillTop} 0%,
      ${({ theme }) => theme.plus.fillBottom} 100%
    );
    box-shadow: inset 0 1px 0 ${({ theme }) => theme.plus.sheen};
  }

  .radio {
    flex-shrink: 0;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid ${({ theme }) => theme.ink.tertiary};
    transition: border-color 150ms;
  }

  /* A ring with a filled centre, drawn as one thick border so nothing has to be positioned. */
  .plan.selected .radio {
    border: 5px solid ${({ theme }) => theme.plus.ink};
  }

  .planBody {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s2};
    flex: 1;
    min-width: 0;
  }

  .planName {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.s8};
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .saving {
    padding: ${({ theme }) => `1px ${theme.space.s6}`};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.plus.ink};
    color: ${({ theme }) => theme.surface.page};
    font-size: ${({ theme }) => theme.size.s10};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .planNote {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .planPrice {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
  }

  .amount {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
    white-space: nowrap;
  }

  .period {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .error {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.45;
    color: ${({ theme }) => theme.direction.owe};
  }
`;

export const StyledPlusMembership = styled.div<{ $notice: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s8};
  padding: ${({ theme }) => theme.space.s14};
  border-radius: ${({ theme }) => theme.radius.surface};
  /* The bright edge marks a plan with something due: a year's renewal coming up, or a payment
     that needs looking at. Otherwise the card sits as quietly as the list under it. */
  border: 1px solid
    ${({ theme, $notice }) =>
      $notice ? theme.plus.edgeStrong : theme.surface.hairline};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.plus.fillTop} 0%,
    ${({ theme }) => theme.plus.fillBottom} 100%
  );
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.plus.sheen};

  .planRow {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .planName {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
    color: ${({ theme }) => theme.ink.primary};
  }

  .planPrice {
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    white-space: nowrap;
  }

  .status {
    margin: 0;
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.45;
    color: ${({ theme, $notice }) =>
      $notice ? theme.ink.primary : theme.ink.secondary};
  }

  .manage {
    align-self: flex-start;
    margin-top: ${({ theme }) => theme.space.s4};
    padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s14}`};
    background: none;
    font-family: inherit;
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.semibold};
    text-decoration: none;
    border-radius: ${({ theme }) => theme.radius.buttonSmall};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    color: ${({ theme }) => theme.ink.primary};
    cursor: pointer;
  }
`;
