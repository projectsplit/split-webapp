import { MouseEvent } from 'react';
import { PlusBadgeSize, StyledPlusBadge } from './PlusBadge.styled';
import { openPlusInfo } from './plusMenu';
import { usePlus } from '@/hooks/usePlus';

interface PlusBadgeProps {
  size?: PlusBadgeSize;
  /**
   * Makes the mark a door to the explanation of what Plus is. Off by default: most marks sit on or
   * beside a small control, where a tap meant for the control would open the Plus sheet instead.
   * The home page's Analytics and Budgeting buttons are big enough to give the mark its own tap.
   */
  opensInfo?: boolean;
  /**
   * Shown to Plus members too. For the places where the mark is the name of the thing rather than
   * a label on a feature: the Plus sheet's own heading, the Settings row that opens it, and a lock.
   */
  always?: boolean;
  className?: string;
}

/**
 * The Plus mark: a small silver pill that says which features belong to Plus.
 *
 * A label, unless it opens the Plus sheet. Then the tap stops there, so a mark sitting on a button
 * that navigates somewhere does not also trigger that button.
 *
 * Gone for a Plus member, whether they subscribe or were given Plus for life. The mark tells
 * someone that a feature is part of a plan they are not on; to someone on that plan it says
 * nothing, on every screen that has one. Someone in their free days still sees it, because those
 * days end and the mark is how they know what ends with them.
 */
export default function PlusBadge({
  size = 'sm',
  opensInfo = false,
  always = false,
  className,
}: PlusBadgeProps) {
  const { isMember } = usePlus();

  if (isMember && !always) return null;

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
