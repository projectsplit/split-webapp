import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StyledBackAndForthAnimation } from './BackAndForthAnimation.styled';
const AnimationStep = ({ children, ...props }) => {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { ...props, nodeRef: nodeRef, children: _jsx("div", { ref: nodeRef, className: "step-container", children: children }) }));
};
export const BackAndForthAnimation = ({ firstChild, secondChild, currentStep, animDirection, }) => {
    return (_jsx(StyledBackAndForthAnimation, { children: _jsx(TransitionGroup, { component: "div", className: "transition-group", childFactory: (child) => React.cloneElement(child, {
                classNames: animDirection === 'forward'
                    ? 'fade'
                    : animDirection === 'back'
                        ? 'fade-back'
                        : 'none',
                enter: animDirection !== 'none',
                exit: animDirection !== 'none',
            }), children: _jsx(AnimationStep, { timeout: animDirection === 'none' ? 0 : 300, unmountOnExit: true, children: currentStep === 1 ? _jsx(_Fragment, { children: firstChild }) : _jsx(_Fragment, { children: secondChild }) }, currentStep) }) }));
};
