import { MouseEvent } from 'react';
import { PlusBadgeSize, StyledPlusBadge } from './PlusBadge.styled';
import { openPlusInfo } from './plusMenu';

interface PlusBadgeProps {
  size?: PlusBadgeSize;
  /**
   * By default the mark is a door to the explanation of what Plus is. Pass false where the
   * explanation is already on screen, or where a tap would fight the surrounding control.
   */
  opensInfo?: boolean;
  className?: string;
}

/**
 * The Plus mark: a small silver pill that says which features belong to Plus.
 *
 * It is a label first and a button second. Tapping it opens the Plus sheet, and the tap stops
 * there, so a mark sitting on a row that navigates somewhere does not also trigger that row.
 */
export default function PlusBadge({
  size = 'sm',
  opensInfo = true,
  className,
}: PlusBadgeProps) {
  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (!opensInfo) return;
    event.stopPropagation();
    openPlusInfo();
  };

  return (
    <StyledPlusBadge
      $size={size}
      $interactive={opensInfo}
      className={className}
      role={opensInfo ? 'button' : undefined}
      aria-label={opensInfo ? 'About Buqs Plus' : 'Plus'}
      onClick={handleClick}
    >
      <span className="word">Plus</span>
    </StyledPlusBadge>
  );
}
