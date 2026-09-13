import styled from 'styled-components';

export const StyledMenuItem = styled.li<{
  $bgColor?: string;
  $selected?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
  padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.surface.hairline : 'transparent'};

  & + & {
    box-shadow: ${({ theme }) => `inset 0 1px 0 ${theme.surface.raisedHigh}`};
  }

  .itemAvatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .itemAvatar.you {
    background-color: ${({ theme }) => theme.accent.you.tint};
    border: 1px solid ${({ theme }) => theme.accent.you.tintBorder};
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .itemAvatar.swatch {
    color: ${({ theme }) => theme.surface.page};
  }

  .title {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .guestChip {
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
`;
