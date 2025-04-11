import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CategoryButton } from "../CategoryButton/CategoryButton";
import Separator from "../Separator/Separator";
import { CategorySelectorProps } from "../../interfaces";
import { StyledCategorySelector } from "./CategorySelector.styled";

export const CategorySelector = ({
  categories,
  activeCat,
  navLinkUse,
  activeCatAsState,
}: CategorySelectorProps) => {
  //activeCat which is "Active" "Archived" should now change with state. This is what changes with link now

  const isFirstRender = useRef(true);
  const categoryKeys = Object.keys(categories);
  const getInitialActiveCategory = () => {
    const currentValue = navLinkUse
      ? activeCat.charAt(0).toUpperCase() + activeCat.slice(1)
      : activeCatAsState
      ? activeCatAsState.value.charAt(0).toUpperCase() + activeCatAsState.value.slice(1)
      : activeCat.charAt(0).toUpperCase() + activeCat.slice(1);
    const initialIndex = Object.values(categories).indexOf(currentValue);
    return initialIndex !== -1 ? categoryKeys[initialIndex] : categoryKeys[0];
  };

  const [activeCategory, setActiveCategory] = useState(getInitialActiveCategory);

  useEffect(() => {
    const updatedCategory = getInitialActiveCategory();
    if (updatedCategory !== activeCategory) {
      setActiveCategory(updatedCategory);
    }
  }, [activeCatAsState?.value, activeCat]);

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

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeCategory,activeCatAsState?.value, activeCat]); // Only re-runs when `activeCategory` changes

  return (
    <StyledCategorySelector>
      <div className="categories">
        {Object.entries(categories).map(([key, label]) => (
          <CategoryButton
            key={key}
            ref={categoryRefs[key]}
            to={ navLinkUse? categories[key as keyof typeof categories]?.toLocaleLowerCase() : undefined }
            onClick={() => {
              setActiveCategory(key);
              if (!navLinkUse && activeCatAsState) {
                activeCatAsState.value = categories[key as keyof typeof categories]!;
              }
            }}
            selected={activeCategory === key}
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
