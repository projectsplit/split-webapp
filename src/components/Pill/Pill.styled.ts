import styled from 'styled-components';

interface StyledPillOptions {
  color: string;
  $textColor?: string;
  fontSize?: string;
  $border: boolean;
  $radius?: string;
  $vivid?: boolean;
}

export const StyledPill = styled.div<StyledPillOptions>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s3};
  padding: ${({ theme }) => `2px ${theme.space.s8}`};
  border-radius: ${({ theme, $radius, $vivid }) =>
    $radius || ($vivid ? theme.radius.chip : theme.radius.pill)};
  font-size: ${({ theme, fontSize }) => fontSize || theme.size.s11};
  font-weight: ${({ theme }) => theme.weight.medium};
  background-color: ${({ color, $vivid }) =>
    $vivid
      ? `color-mix(in oklab, ${color} 14%, transparent)`
      : `color-mix(in oklab, ${color} 22%, transparent)`};
  border: 1px solid
    ${({ $border, color, $vivid }) =>
      $vivid
        ? 'transparent'
        : $border !== false
          ? `color-mix(in oklab, ${color} 40%, transparent)`
          : 'transparent'};
  color: ${({ color, $textColor }) => $textColor || color};
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  .titleAndCloseButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: ${({ theme }) => theme.space.s6};
    cursor: pointer;

    .childrenAndTitle {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .children {
        display: flex;
      }
    }

    .title {
      color: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }

    .closeSign {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${({ theme }) => theme.icon.sm};
    }
  }
`;
