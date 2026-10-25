import { MouseEvent } from 'react';
import { PlusBadgeSize, StyledPlusBadge } from './PlusBadge.styled';
import { openPlusInfo } from './plusMenu';

interface PlusBadgeProps {
  size?: PlusBadgeSize;
  /**
   * Makes the mark a door to the explanation of what Plus is. Off by default: most marks sit on or
   * beside a small control, where a tap meant for the control would open the Plus sheet instead.
   * The home page's Analytics and Budgeting buttons are big enough to give the mark its own tap.
   */
  opensInfo?: boolean;
  className?: string;
}

/**
 * The Plus mark: a small silver pill that says which features belong to Plus.
 *
 * A label, unless it opens the Plus sheet. Then the tap stops there, so a mark sitting on a button
 * that navigates somewhere does not also trigger that button.
 */
export default function PlusBadge({
  size = 'sm',
  opensInfo = false,
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
