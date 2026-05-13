import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StyledBackAndForthAnimation } from './BackAndForthAnimation.styled';

interface BackAndForthAnimationProps {
  firstChild: any;
  secondChild: any;
  currentStep: number;
  animDirection: 'none' | 'forward' | 'back';
}
const AnimationStep = ({ children, ...props }: any) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition {...props} nodeRef={nodeRef}>
      <div ref={nodeRef} className="step-container">
        {children}
      </div>
    </CSSTransition>
  );
};

export const BackAndForthAnimation = ({
  firstChild,
  secondChild,
  currentStep,
  animDirection,
}: BackAndForthAnimationProps) => {
  return (
    <StyledBackAndForthAnimation>
      <TransitionGroup
        component="div"
        className="transition-group"
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames:
              animDirection === 'forward'
                ? 'fade'
                : animDirection === 'back'
                  ? 'fade-back'
                  : 'none',
            enter: animDirection !== 'none',
            exit: animDirection !== 'none',
          })
        }
      >
        <AnimationStep
          key={currentStep}
          timeout={animDirection === 'none' ? 0 : 300}
          unmountOnExit
        >
          {currentStep === 1 ? <>{firstChild}</> : <>{secondChild}</>}
        </AnimationStep>
      </TransitionGroup>
    </StyledBackAndForthAnimation>
  );
};
