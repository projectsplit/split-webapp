import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StyledBackAndForthAnimation } from './BackAndForthAnimation.styled';

interface BackAndForthAnimationProps {
  firstChild: any;
  secondChild: any;
  currentStep: number;
  animDirection: 'none' | 'forward' | 'back';
}
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
        <CSSTransition
          key={currentStep}
          timeout={animDirection === 'none' ? 0 : 300}
          classNames={
            animDirection === 'forward'
              ? 'fade'
              : animDirection === 'back'
                ? 'fade-back'
                : 'none'
          }
          enter={animDirection !== 'none'}
          exit={animDirection !== 'none'}
          unmountOnExit
        >
          <div className="step-container">
            {currentStep === 1 ? <>{firstChild}</> : <>{secondChild}</>}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </StyledBackAndForthAnimation>
  );
};
