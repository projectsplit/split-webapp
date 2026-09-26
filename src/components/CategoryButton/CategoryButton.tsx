import { StyledCategoryButton } from './CategoryButton.styled';
import { CategoryButtonProps } from '../../interfaces';
import { NavLink } from 'react-router-dom';
import { forwardRef, memo, useCallback } from 'react';

const CategoryButtonPreMemo = forwardRef<
  HTMLButtonElement,
  CategoryButtonProps
>(
  (
    { children, to, selected, onClick, backgroundcoloronselect, style, variant },
    ref
  ) => {
    const navLinkClassName = useCallback(
      ({ isActive }: { isActive: boolean }) =>
        isActive || selected ? 'active' : 'inactive',
      [selected]
    );

    return (
      <StyledCategoryButton
        backgroundcoloronselect={backgroundcoloronselect}
        variant={variant}
        style={style}
        ref={ref as any}
      >
        {to ? (
          <NavLink
            to={to}
            replace
            className={navLinkClassName}
            onClick={onClick}
          >
            {children}
          </NavLink>
        ) : (
          <div className={selected ? 'active' : 'inactive'} onClick={onClick}>
            {children}
          </div>
        )}
      </StyledCategoryButton>
    );
  }
);

export const CategoryButton = memo(CategoryButtonPreMemo);
