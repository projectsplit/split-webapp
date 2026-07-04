import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CategoryButton } from '../CategoryButton/CategoryButton';
import Separator from '../Separator/Separator';
import { StyledCategorySelector } from './CategorySelector.styled';
import { useCategorySwipe } from './useCategorySwipe';
export const CategorySelector = ({ categories, activeCat, navLinkUse, activeCatAsState, }) => {
    //activeCat which is "Active" "Archived" should now change with state. This is what changes with link now
    const isFirstRender = useRef(true);
    const categoryKeys = Object.keys(categories);
    const getInitialActiveCategory = () => {
        const currentValue = navLinkUse
            ? activeCat.charAt(0).toUpperCase() + activeCat.slice(1)
            : activeCatAsState
                ? activeCatAsState.value.charAt(0).toUpperCase() +
                    activeCatAsState.value.slice(1)
                : activeCat.charAt(0).toUpperCase() + activeCat.slice(1);
        const initialIndex = Object.values(categories).indexOf(currentValue);
        return initialIndex !== -1 ? categoryKeys[initialIndex] : categoryKeys[0];
    };
    const [activeCategory, setActiveCategory] = useState(getInitialActiveCategory);
    const { onTouchStart, onTouchEnd } = useCategorySwipe({
        categories,
        activeCat,
        navLinkUse,
        activeCatAsState,
    });
    useEffect(() => {
        const updatedCategory = getInitialActiveCategory();
        if (updatedCategory !== activeCategory) {
            setActiveCategory(updatedCategory);
        }
    }, [activeCatAsState?.value, activeCat]);
    const [indicatorPosition, setIndicatorPosition] = useState({
        left: '0px',
        width: '0px',
        transition: 'none', //Start without transition
    });
    const categoryRefs = {};
    categoryKeys.forEach((key) => {
        categoryRefs[key] = useRef(null);
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
                transition: 'none', // No transition on first render
            });
        }
        isFirstRender.current = false;
    }, []); // Runs only once before paint. So after first render useLayOutEffect has updated the left and width of the indicator.
    useEffect(() => {
        if (isFirstRender.current)
            return; // Avoid transition on first render. Will probably never run because useLayOutEffect will have already set that to false as it runs before the useEffect
        const updateIndicator = () => {
            const activeButton = categoryRefs[activeCategory]?.current;
            if (activeButton) {
                const { offsetLeft, clientWidth } = activeButton;
                const reducedWidth = clientWidth * 0.5;
                setIndicatorPosition({
                    left: `${offsetLeft + clientWidth / 2}px`,
                    width: `${reducedWidth}px`,
                    transition: 'left 0.15s ease-in-out', //Apply transition only after first render
                });
            }
        };
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeCategory, activeCatAsState?.value, activeCat]);
    const isSmallScreen = window.matchMedia('(max-width: 400px)').matches;
    const getCategoryLabel = (label) => {
        if (label === 'Percentages' && isSmallScreen) {
            return '%ages';
        }
        return label;
    };
    return (_jsxs(StyledCategorySelector, { onTouchStart: onTouchStart, onTouchEnd: onTouchEnd, children: [_jsxs("div", { className: "categories", children: [Object.entries(categories).map(([key, label]) => (_jsx(CategoryButton, { ref: categoryRefs[key], to: navLinkUse
                            ? categories[key]?.toLocaleLowerCase()
                            : undefined, onClick: () => {
                            setActiveCategory(key);
                            if (!navLinkUse && activeCatAsState) {
                                activeCatAsState.value =
                                    categories[key];
                            }
                        }, selected: activeCategory === key, children: getCategoryLabel(label) }, key))), _jsx("div", { className: "selectedIndicator", style: {
                            left: indicatorPosition.left,
                            width: indicatorPosition.width,
                            transform: 'translateX(-50%)',
                            transition: indicatorPosition.transition,
                        } })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }));
};
