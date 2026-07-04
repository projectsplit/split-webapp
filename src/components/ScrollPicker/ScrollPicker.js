import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { closestMultiple } from '../../utils';
import StyledScrollPicker from './ScrollPicker.styled';
const ScrollPicker = ({ items, selectedIndex, setSelectedIndex, }) => {
    const [itemHeight, setItemHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const visibleItemsCount = Math.floor(containerHeight / itemHeight);
    const itemsBeforeCenterItem = visibleItemsCount % 2 === 0
        ? visibleItemsCount / 2 - 1
        : Math.floor(visibleItemsCount / 2);
    const heightBeforeCenterItem = itemsBeforeCenterItem * itemHeight;
    const almostHalfItemHeight = Math.floor(itemHeight / 2) - 2;
    const upperBound = heightBeforeCenterItem + almostHalfItemHeight;
    const lowerBound = heightBeforeCenterItem -
        (items.length - 1) * itemHeight -
        almostHalfItemHeight;
    const [isDragging, setIsDragging] = useState(false);
    const [translateY, setTranslateY] = useState(0);
    const centerHeight = heightBeforeCenterItem - translateY;
    const centerIndex = Math.round(centerHeight / itemHeight);
    useEffect(() => {
        if (itemRef.current) {
            setItemHeight(itemRef.current.getBoundingClientRect().height);
        }
        if (containerRef.current) {
            setContainerHeight(containerRef.current.getBoundingClientRect().height);
        }
    }, []);
    useEffect(() => {
        setTranslateY(-itemHeight * (selectedIndex - itemsBeforeCenterItem));
        window.addEventListener('pointerup', onPointerUp);
        return () => {
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [itemHeight]);
    useEffect(() => {
        if (itemHeight > 0 && centerIndex >= 0 && centerIndex < items.length) {
            setSelectedIndex(centerIndex);
        }
    }, [itemHeight, translateY]);
    const handleGrab = () => {
        setIsDragging(true);
    };
    const calcNewTranslateY = (prevTranslateY, eventY) => {
        let newTranslateY = prevTranslateY + eventY;
        if (newTranslateY > upperBound)
            newTranslateY = upperBound;
        if (newTranslateY < lowerBound)
            newTranslateY = lowerBound;
        return newTranslateY;
    };
    const onPointerMove = (event) => {
        if (!isDragging)
            return;
        setTranslateY((prev) => calcNewTranslateY(prev, event.movementY));
    };
    const onPointerUp = () => {
        setIsDragging(false);
        setTranslateY((prev) => closestMultiple(prev, itemHeight));
    };
    const onScroll = (event) => {
        if (event.deltaY > 0 && centerIndex < items.length - 1)
            setTranslateY((prev) => prev - itemHeight);
        if (event.deltaY < 0 && centerIndex > 0)
            setTranslateY((prev) => prev + itemHeight);
    };
    return (_jsx(StyledScrollPicker, { ref: containerRef, onPointerDown: handleGrab, onPointerUp: onPointerUp, onPointerMove: onPointerMove, onWheel: onScroll, children: items.map((item, i) => (_jsx("div", { ref: i === 0 ? itemRef : null, className: `item${centerIndex === i ? ' selected' : ''}`, style: { transform: `translateY(${translateY}px)` }, children: item }, i))) }));
};
export default ScrollPicker;
