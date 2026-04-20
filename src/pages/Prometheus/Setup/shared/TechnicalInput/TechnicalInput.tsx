import type { ReactNode } from 'react';
import { Shell } from './TechnicalInput.styled';

interface TechnicalInputProps {
  children: ReactNode;
  accent?: 'primary' | 'error' | 'error-soft';
  pad?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TechnicalInput = ({
  children,
  accent,
  pad,
  className,
}: TechnicalInputProps) => {
  return (
    <Shell $accent={accent} $pad={pad} className={className}>
      {children}
    </Shell>
  );
};
