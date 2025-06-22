import { StyledCategoryButton } from "./CategoryButton.styled";
import { CategoryButtonProps } from "../../interfaces";
import { NavLink } from "react-router-dom";
import { forwardRef } from "react";

export const CategoryButton = forwardRef<HTMLButtonElement, CategoryButtonProps>(

  ({ children, to, selected, onClick, backgroundcoloronselect, style }, ref) => {
    return (
      <StyledCategoryButton
        backgroundcoloronselect={backgroundcoloronselect}
        style={style}
        ref={ref as any} 
      >
        {to ? (
          <NavLink
            to={to}
            replace
            className={({ isActive }) => (isActive||selected ? "active" : "inactive")}
            onClick={onClick}
          >
            {children}
          </NavLink>
        ) : (
          <div
            className={selected ? "active" : "inactive"}
            onClick={onClick}
          >
            {children}
          </div>
        )}
      </StyledCategoryButton>
    );
  }
);