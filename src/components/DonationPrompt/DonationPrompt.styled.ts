import styled, { keyframes } from 'styled-components';

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
`;

export const Card = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  background-color: ${({ theme }) => theme.layer2};
  border: 1px solid ${({ theme }) => theme.lightBorder};
  border-radius: 16px;
  padding: 22px 20px 18px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
  animation: ${riseIn} 260ms cubic-bezier(0.16, 1, 0.3, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CloseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -8px -6px 0 0;

  .closeButton {
    font-size: 22px;
    color: ${({ theme }) => theme.secondaryTextColor};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primaryTextColor};
    }
  }
`;

export const StyledDonationForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .loading {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
`;

export const PuppyFrame = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -4px;
`;

export const Headline = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 19px;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryTextColor};
`;

export const Subhead = styled.p`
  margin: 0;
  text-align: center;
  font-size: 14px;
  line-height: 1.45;
  color: ${({ theme }) => theme.textInactiveColor};
`;

export const AmountRow = styled.div`
  display: grid;
  /* Auto-fit rather than a fixed count, because how many tiers there are is a server setting and
     Play drops any the console does not know about. The floor is what a price like "$12.00" needs
     before it wraps mid-amount; below that the row folds to fewer columns on its own. */
  grid-template-columns: repeat(auto-fit, minmax(74px, 1fr));
  gap: 8px;
  /* Room for the badge that overhangs the top of a tier. */
  margin-top: 11px;
`;

export const Preset = styled.button<{ $selected: boolean }>`
  position: relative;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 4px;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background-color 150ms,
    border-color 150ms,
    color 150ms;

  background-color: ${({ theme, $selected }) =>
    $selected ? theme.highlightColor : theme.layer1};
  color: ${({ theme, $selected }) =>
    $selected ? '#ffffff' : theme.whiteText};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.highlightColor : theme.greyOutline};

  /* Marks the recurring tier. Labelled plainly rather than dressed up as popular or recommended —
     claiming other people chose it would not be true. */
  span {
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 1px 6px;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.highlightColor};
    color: #ffffff;
  }
`;

export const ErrorText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.redish};
`;

export const Disclaimer = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryTextColor};
`;

export const Footnote = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textInactiveColor};
`;

export const DismissRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.lineColor};
`;

/* Both ways out are plain text of the same weight. Making "don't ask again" harder to find than
   "not now" would be the trick this prompt is meant to avoid. */
export const DismissButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.secondaryTextColor};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
  }
`;

export const ThankYou = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;

  .title {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.primaryTextColor};
  }

  .body {
    font-size: 14px;
    line-height: 1.45;
    color: ${({ theme }) => theme.textInactiveColor};
  }
`;
