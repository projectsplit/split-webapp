import styled from 'styled-components';

export const StyledCategorySelector = styled.div<{
  $segmented?: boolean;
  $compact?: boolean;
}>`
  flex-shrink: 0;

  .categories {
    display: flex;
    flex-direction: row;
    position: relative;

    ${({ $segmented, $compact, theme }) =>
      $segmented
        ? `
      gap: ${theme.space.s3};
      padding: ${theme.space.s3};
      background-color: ${theme.surface.card};
      border: 1px solid ${theme.surface.hairline};
      border-radius: ${$compact ? '11px' : '10px'};
    `
        : `
      justify-content: space-around;
      gap: ${theme.space.s4};
      padding: 0 ${theme.space.s12};
      border-bottom: 1px solid ${theme.surface.raisedHigh};
    `}

    .selectedIndicator {
      display: ${({ $segmented }) => ($segmented ? 'none' : 'block')};
      position: absolute;
      bottom: -1px;
      height: 2px;
      background-color: ${({ theme }) => theme.ink.primary};
      border-radius: ${({ theme }) => theme.radius.pill};
    }
  }
`;
