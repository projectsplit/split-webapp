import { useTheme } from 'styled-components';
import {
  CarouselItemWrapper,
  Dot,
  DotsContainer,
  StyledBudgetCarousel,
} from './BudgetCarousel.styled';
import { BudgetInfoResponse } from '@/types';
import { BackAndForthAnimation } from '@/components/Animations/BackAndForthAnimation/BackAndForthAnimation';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { Bar } from '@/pages/Budget/ProgressBar/Bar/Bar';
import { progressBarColor } from '@/pages/Budget/ProgressBar/utils/progressBarColor';
import { useEffect, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const BudgetCarousel = ({ activeBudgetData, setShowBudgetInfo }: BudgetCarouselProps) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [animDirection, setAnimDirection] = useState<
    'forward' | 'back' | 'none'
  >('forward');
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleAnimDirection = (targetStep: number) => {
    if (targetStep === 1) {
      setAnimDirection('back');
    } else {
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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      // Swipe left
      if (currentStep === 1) {
        setAnimDirection('forward');
        setCurrentStep(2);
      }
    } else if (distance < -50) {
      // Swipe right
      if (currentStep === 2) {
        setAnimDirection('back');
        setCurrentStep(1);
      }
    }
    setTouchStart(null);
  };

  const onDotClick = (step: number) => {
    if (step === currentStep) return;
    handleAnimDirection(step);
    setCurrentStep(step);
  };

  return (
    <StyledBudgetCarousel onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <BackAndForthAnimation
        firstChild={
          <CarouselItemWrapper>
            <div className="closeButton" onClick={() => setShowBudgetInfo(false)}>
              <IonIcon name="close-outline" className="close" />
            </div>
            {BudgetInfoMessage(theme, false, activeBudgetData, undefined, {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              padding: 0,
            })}
          </CarouselItemWrapper>
        }
        secondChild={
          <CarouselItemWrapper>
            <div className="closeButton" onClick={() => setShowBudgetInfo(false)}>
              <IonIcon name="close-outline" className="close" />
            </div>
            <Bar
              color={progressBarColor(activeBudgetData, theme)}
              data={activeBudgetData}
            />
          </CarouselItemWrapper>
        }
        currentStep={currentStep}
        animDirection={animDirection}
      />
      <DotsContainer>
        <Dot $active={currentStep === 1} onClick={() => onDotClick(1)} />
        <Dot $active={currentStep === 2} onClick={() => onDotClick(2)} />
      </DotsContainer>
    </StyledBudgetCarousel>
  );
};

interface BudgetCarouselProps {
  activeBudgetData: BudgetInfoResponse | undefined;
  setShowBudgetInfo: UseMutateAsyncFunction<any, AxiosError<unknown, any>, boolean, unknown>
}
