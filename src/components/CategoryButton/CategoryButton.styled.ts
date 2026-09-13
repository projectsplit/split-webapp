import styled from 'styled-components';
import { CategoryButtonProps } from '../../interfaces';

export const StyledCategoryButton = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['selected', 'backgroundcoloronselect', 'variant'].includes(prop),
})<CategoryButtonProps>`
  display: flex;
  flex-direction: row;

  .active,
  .inactive,
  .selected,
  .unselected {
    cursor: pointer;
    text-decoration: none;
    font-size: ${({ theme, variant }) =>
      variant === 'pill'
        ? theme.size.s13
        : variant === 'segment'
          ? theme.size.s13
          : variant === 'segmentCompact'
            ? theme.size.s12
            : theme.size.s14};
  }

  ${({ variant }) =>
    variant === 'segment' || variant === 'segmentCompact' ? 'flex: 1;' : ''}

  ${({ variant, theme }) =>
    variant === 'segment' || variant === 'segmentCompact'
      ? `
    .active, .selected, .inactive, .unselected {
      flex: 1;
      text-align: center;
      padding: 7px 0;
      border-radius: ${variant === 'segmentCompact' ? '8px' : '7px'};
      font-size: ${
        variant === 'segmentCompact' ? theme.size.s12 : theme.size.s13
      };
    }
    .active, .selected {
      background-color: ${theme.surface.hairline};
      color: ${theme.ink.primary};
      font-weight: ${theme.weight.semibold};
    }
    .inactive, .unselected {
      background-color: transparent;
      color: ${theme.ink.secondary};
      font-weight: ${theme.weight.medium};
    }
  `
      : variant === 'pill'
      ? `
    .active, .selected, .inactive, .unselected {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${theme.space.s6};
    }
    .active, .selected {
      padding: ${theme.space.s6} ${theme.space.s14};
      border-radius: ${theme.radius.buttonSmall};
      border: 1px solid ${theme.surface.outline};
      background-color: ${theme.surface.hairline};
      color: ${theme.ink.primary};
      font-weight: ${theme.weight.semibold};
    }
    .inactive, .unselected {
      padding: ${theme.space.s6} ${theme.space.s14};
      border-radius: ${theme.radius.buttonSmall};
      border: 1px solid ${theme.surface.hairline};
      color: ${theme.ink.secondary};
      font-weight: ${theme.weight.medium};
    }
  `
      : `
    .active, .selected {
      padding-bottom: 11px;
      color: ${theme.ink.primary};
      font-weight: ${theme.weight.semibold};
    }
    .inactive, .unselected {
      padding-bottom: 11px;
      color: ${theme.ink.tertiary};
      font-weight: ${theme.weight.medium};
    }
  `}
`;
