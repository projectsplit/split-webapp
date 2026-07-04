import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from 'styled-components';
import { CarouselItemWrapper, Dot, DotsContainer, StyledBudgetCarousel, } from './BudgetCarousel.styled';
import { BackAndForthAnimation } from '@/components/Animations/BackAndForthAnimation/BackAndForthAnimation';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { Bar } from '@/pages/Budget/ProgressBar/Bar/Bar';
import { progressBarColor } from '@/pages/Budget/ProgressBar/utils/progressBarColor';
import { useEffect, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
export const BudgetCarousel = ({ activeBudgetData, setShowBudgetInfo, setShowButton, onClick, }) => {
    const theme = useTheme();
    const [currentStep, setCurrentStep] = useState(1);
    const [animDirection, setAnimDirection] = useState('forward');
    const [touchStart, setTouchStart] = useState(null);
    const handleAnimDirection = (targetStep) => {
        if (targetStep === 1) {
            setAnimDirection('back');
        }
        else {
            setAnimDirection('forward');
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const nextStep = currentStep === 1 ? 2 : 1;
            handleAnimDirection(nextStep);
            setCurrentStep(nextStep);
        }, 12000);
        return () => clearInterval(interval);
    }, [currentStep]);
    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchEnd = (e) => {
        if (!touchStart)
            return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;
        if (distance > 50) {
            // Swipe left
            if (currentStep === 1) {
                setAnimDirection('forward');
                setCurrentStep(2);
            }
        }
        else if (distance < -50) {
            // Swipe right
            if (currentStep === 2) {
                setAnimDirection('back');
                setCurrentStep(1);
            }
        }
        setTouchStart(null);
    };
    const onDotClick = (step) => {
        if (step === currentStep)
            return;
        handleAnimDirection(step);
        setCurrentStep(step);
    };
    return (_jsxs(StyledBudgetCarousel, { onTouchStart: onTouchStart, onTouchEnd: onTouchEnd, children: [_jsx(BackAndForthAnimation, { firstChild: _jsxs(CarouselItemWrapper, { onClick: onClick, children: [_jsx("div", { className: "closeButton", onClick: (e) => {
                                e.stopPropagation();
                                setShowBudgetInfo(false);
                                setShowButton(true);
                            }, children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }), BudgetInfoMessage(theme, false, activeBudgetData, undefined, undefined, {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            border: 'none',
                            padding: 0,
                        })] }), secondChild: _jsxs(CarouselItemWrapper, { onClick: onClick, children: [_jsx("div", { className: "closeButton", onClick: (e) => {
                                e.stopPropagation();
                                setShowBudgetInfo(false);
                                setShowButton(true);
                            }, children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }), _jsx(Bar, { color: progressBarColor(activeBudgetData, theme), data: activeBudgetData })] }), currentStep: currentStep, animDirection: animDirection }), _jsxs(DotsContainer, { children: [_jsx(Dot, { "$active": currentStep === 1, onClick: () => onDotClick(1) }), _jsx(Dot, { "$active": currentStep === 2, onClick: () => onDotClick(2) })] })] }));
};
