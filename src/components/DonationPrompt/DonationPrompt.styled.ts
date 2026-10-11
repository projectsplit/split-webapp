import styled from 'styled-components';

export const StyledDonationForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s12};

  .loading {
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => `${theme.space.s20} 0`};
  }
`;

export const OtherAmount = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};

  .amountInput {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
    border-radius: ${({ theme }) => theme.radius.control};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    background-color: ${({ theme }) => theme.surface.raised};
    transition: border-color 150ms;

    &:focus-within {
      border-color: ${({ theme }) => theme.accent.you.ink};
    }
  }

  .currency {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s17};
    color: ${({ theme }) => theme.ink.secondary};
  }

  input {
    flex: 1;
    min-width: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.ink.primary};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};

    &::placeholder {
      color: ${({ theme }) => theme.ink.tertiary};
      font-weight: ${({ theme }) => theme.weight.regular};
    }
  }

  .monthlyRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme }) => theme.ink.primary};
  }
`;

export const PuppyFrame = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -${({ theme }) => theme.space.s4};
`;

export const Headline = styled.h2`
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.size.s17};
  font-weight: ${({ theme }) => theme.weight.semibold};
  color: ${({ theme }) => theme.ink.primary};
`;

export const Subhead = styled.p`
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.size.s14};
  line-height: 1.45;
  color: ${({ theme }) => theme.ink.tertiary};
`;

export const AmountRow = styled.div`
  display: grid;
  /* Auto-fit rather than a fixed count, because how many tiers there are is a server setting and
     Play drops any the console does not know about. The floor is what a price like "$12.00" needs
     before it wraps mid-amount; below that the row folds to fewer columns on its own. */
  grid-template-columns: repeat(auto-fit, minmax(74px, 1fr));
  gap: ${({ theme }) => theme.space.s8};
  /* Room for the badge that overhangs the top of a tier. */
  margin-top: ${({ theme }) => theme.space.s12};
`;

export const Preset = styled.button<{ $selected: boolean }>`
  position: relative;
  font-family: inherit;
  font-size: ${({ theme }) => theme.size.s15};
  font-weight: ${({ theme }) => theme.weight.semibold};
  padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s4}`};
  border-radius: ${({ theme }) => theme.radius.control};
  cursor: pointer;
  transition:
    background-color 150ms,
    border-color 150ms,
    color 150ms;

  background-color: ${({ theme, $selected }) =>
    $selected ? theme.accent.you.tint : theme.surface.raised};
  color: ${({ theme, $selected }) =>
    $selected ? theme.accent.you.ink : theme.ink.primary};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.accent.you.tintBorder : theme.surface.outline};

  /* Marks the recurring tier. Labelled plainly rather than dressed up as popular or recommended —
     claiming other people chose it would not be true. */
  span {
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: ${({ theme }) => theme.size.s10};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: ${({ theme }) => `1px ${theme.space.s6}`};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.accent.you.fill};
    color: ${({ theme }) => theme.surface.page};
  }
`;

export const ErrorText = styled.div`
  font-size: ${({ theme }) => theme.size.s12};
  color: ${({ theme }) => theme.direction.owe};
`;

export const Disclaimer = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.size.s12};
  color: ${({ theme }) => theme.ink.secondary};
`;

export const Footnote = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.size.s12};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.ink.tertiary};
`;

export const ThankYou = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.s10};
  text-align: center;

  .title {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    color: ${({ theme }) => theme.ink.primary};
  }

  .body {
    font-size: ${({ theme }) => theme.size.s14};
    line-height: 1.45;
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
