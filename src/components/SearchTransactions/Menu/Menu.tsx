import React from 'react';
import ReactDOM from 'react-dom';
import { ScrollableContainer } from './ScrollableContainer.styled';
import { CombinedMenuProps } from '../../../interfaces';
import { StyledMenu } from './Menu.styled';

export const Menu = React.forwardRef<HTMLDivElement, CombinedMenuProps>(
  ({ open, container, loading, ...other }, ref) => {
    if (!container) return null;

    return ReactDOM.createPortal(
      <ScrollableContainer>
        <div className="items">
          <StyledMenu ref={ref} {...other} />
          <div className="menuHint">
            Tap a name to complete the filter. Keep typing to narrow the list.
          </div>
        </div>
      </ScrollableContainer>,
      container
    );
  }
);
