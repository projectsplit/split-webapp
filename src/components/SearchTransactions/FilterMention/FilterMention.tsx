import { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';
import {
  BeautifulMentionsItemData,
  useBeautifulMentions,
} from 'lexical-beautiful-mentions';
import { StyledFilterMention } from './FilterMention.styled';
import { resolveLabelColor } from '../../../helpers/labelChip';

interface FilterMentionProps {
  trigger: string;
  value: string;
  className?: string;
  data?: Record<string, BeautifulMentionsItemData>;
}

export const FilterMention = forwardRef<HTMLSpanElement, FilterMentionProps>(
  ({ trigger, value, className, data, ...rest }, ref) => {
    const { removeMentions } = useBeautifulMentions();

    const isLabel = !!data && 'color' in data;
    const labelColor = isLabel
      ? resolveLabelColor(String(data.color))
      : undefined;

    return (
      <StyledFilterMention
        ref={ref}
        className={className}
        $color={labelColor}
        {...rest}
      >
        <span className="mentionTrigger">{trigger}</span>
        <span className="mentionValue">{value}</span>
        <span
          className="mentionRemove"
          role="button"
          aria-label={`Remove ${trigger}${value}`}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeMentions({ trigger, value, focus: true });
          }}
        >
          <IoClose />
        </span>
      </StyledFilterMention>
    );
  }
);
