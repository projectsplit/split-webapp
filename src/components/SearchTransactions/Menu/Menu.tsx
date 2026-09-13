import React from 'react';
import { ScrollableContainer } from './ScrollableContainer.styled';
import { CombinedMenuProps } from '../../../interfaces';
import { StyledMenu } from './Menu.styled';

export const Menu = React.forwardRef<HTMLDivElement, CombinedMenuProps>(
  ({ open, contentEditableHeight, loading, ...other }, ref) => {
    return (
      <ScrollableContainer $contentEditableHeight={contentEditableHeight}>
        <div className="items">
          <StyledMenu
            ref={ref}
            $contentEditableHeight={contentEditableHeight}
            {...other}
          />
          <div className="menuHint">
            Tap a name to complete the filter. Keep typing to narrow the list.
          </div>
        </div>
      </ScrollableContainer>
    );
  }
);
