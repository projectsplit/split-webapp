import { useTheme } from 'styled-components';
import { CarouselItemWrapper, StyledBudgetCarousel } from './BudgetCarousel.styled';
import { BudgetInfoResponse } from '@/types';
import { BackAndForthAnimation } from '@/components/Animations/BackAndForthAnimation/BackAndForthAnimation';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { Bar } from '@/pages/Budget/ProgressBar/Bar/Bar';
import { progressBarColor } from '@/pages/Budget/ProgressBar/utils/progressBarColor';
import { useEffect, useState } from 'react';

export const BudgetCarousel = ({ activeBudgetData }: BudgetCarouselProps) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [animDirection, setAnimDirection] = useState<
    'forward' | 'back' | 'none'
  >('forward');

  const handleAnimDirection = () => {
    setAnimDirection(animDirection === 'forward' ? 'back' : 'forward');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(currentStep === 1 ? 2 : 1);
      handleAnimDirection();
    }, 12000);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <StyledBudgetCarousel>
      <BackAndForthAnimation
        firstChild={
          <CarouselItemWrapper>
            {BudgetInfoMessage(theme, true, activeBudgetData, undefined, {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              padding: 0,
            })}
          </CarouselItemWrapper>
        }
        secondChild={
          <CarouselItemWrapper>
            <Bar
              color={progressBarColor(activeBudgetData, theme)}
              data={activeBudgetData}
            />
          </CarouselItemWrapper>
        }
        currentStep={currentStep}
        animDirection={animDirection}
      />
    </StyledBudgetCarousel>
  );
};

interface BudgetCarouselProps {
  activeBudgetData: BudgetInfoResponse | undefined;
}
