import styled from 'styled-components';
import {
  labelChipBackground,
  labelChipInk,
  labelChipMutedInk,
} from '../../../helpers/labelChip';

export const StyledFilterMention = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s4};
  font-size: ${({ theme }) => theme.size.s12};
  line-height: 16px;
  padding: ${({ theme }) => `${theme.space.s2} ${theme.space.s8}`};
  border-radius: ${({ theme, $color }) =>
    $color ? theme.radius.chip : theme.radius.control};
  background-color: ${({ theme, $color }) =>
    $color
      ? labelChipBackground($color)
      : theme.surface.raised};
  border: 1px solid
    ${({ theme, $color }) => ($color ? 'transparent' : theme.surface.mark)};
  vertical-align: middle;
  margin-right: ${({ theme }) => theme.space.s6};

  .mentionTrigger {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme, $color }) =>
      $color ? labelChipMutedInk($color) : theme.ink.tertiary};
  }

  .mentionValue {
    font-family: ${({ theme }) => theme.font.sans};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme, $color }) =>
      $color ? labelChipInk($color) : theme.ink.primary};
  }

  .mentionRemove {
    margin-left: ${({ theme }) => theme.space.s2};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.control};
    color: ${({ theme, $color }) =>
      $color ? labelChipInk($color) : theme.ink.tertiary};
    font-size: ${({ theme }) => theme.size.s13};
    cursor: pointer;

    &:hover {
      color: ${({ theme, $color }) =>
        $color ? labelChipInk($color) : theme.ink.primary};
      background-color: ${({ theme, $color }) =>
        $color
          ? `color-mix(in oklab, ${$color} 34%, transparent)`
          : theme.surface.mark};
    }
  }
`;
