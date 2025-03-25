import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CategoryButton } from "../CategoryButton/CategoryButton";
import Separator from "../Separator/Separator";
import { CategorySelectorProps } from "../../interfaces";
import { StyledCategorySelector } from "./CategorySelector.styled";

export const CategorySelector = ({
  categories,
  activeCat,
}: CategorySelectorProps) => {
  const isFirstRender = useRef(true);
  const categoryKeys = Object.keys(categories);
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(categories)[
      Object.values(categories).indexOf(
        activeCat.charAt(0).toUpperCase() + activeCat.slice(1)
      )
    ]
  ); // Capitalizes first letter

  const [indicatorPosition, setIndicatorPosition] = useState({
    left: "0px",
    width: "0px",
    transition: "none", //Start without transition
  });

  const categoryRefs: Record<string, React.RefObject<HTMLButtonElement>> = {};
  categoryKeys.forEach((key) => {
    categoryRefs[key] = useRef<HTMLButtonElement>(null);
  });

  useLayoutEffect(() => {
    // Ensure we update the position before the first paint
    const activeButton = categoryRefs[activeCategory]?.current;

    if (activeButton) {
      const { offsetLeft, clientWidth } = activeButton;
      const reducedWidth = clientWidth * 0.5;

      setIndicatorPosition({
        left: `${offsetLeft + clientWidth / 2}px`,
        width: `${reducedWidth}px`,
        transition: "none", // No transition on first render
      });
    }

    isFirstRender.current = false;
  }, []); // Runs only once before paint. So after first render useLayOutEffect has updated the left and width of the indicator.

  useEffect(() => {
    if (isFirstRender.current) return; // Avoid transition on first render. Will probably never run because useLayOutEffect will have already set that to false as it runs before the useEffect

    const updateIndicator = () => {
      const activeButton = categoryRefs[activeCategory]?.current;

      if (activeButton) {
        const { offsetLeft, clientWidth } = activeButton;
        const reducedWidth = clientWidth * 0.5;

        setIndicatorPosition({
          left: `${offsetLeft + clientWidth / 2}px`,
          width: `${reducedWidth}px`,
          transition: "left 0.15s ease-in-out", //Apply transition only after first render
        });
      }
    };

    setActiveCategory(
      Object.keys(categories)[
        Object.values(categories).indexOf(
          activeCat.charAt(0).toUpperCase() + activeCat.slice(1)
        )
      ]
    );

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeCategory, activeCat]); // Only re-runs when `activeCategory` changes

  return (
    <StyledCategorySelector>
      <div className="groupCategories">
        {Object.entries(categories).map(([key, label]) => (
          <CategoryButton
            key={key}
            ref={categoryRefs[key]}
            to={categories[key as keyof typeof categories].toLocaleLowerCase()}
            onClick={() => {
              setActiveCategory(key);
            }}
          >
            {label}
          </CategoryButton>
        ))}
        <div
          className="selectedIndicator"
          style={{
            left: indicatorPosition.left,
            width: indicatorPosition.width,
            transform: "translateX(-50%)",
            transition: indicatorPosition.transition,
          }}
        />
      </div>
      <div className="separator">
        <Separator />
      </div>
    </StyledCategorySelector>
  );
};
