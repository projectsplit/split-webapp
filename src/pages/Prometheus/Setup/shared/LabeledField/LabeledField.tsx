import type { ReactNode } from 'react';
import { FieldWrapper, FieldLabel } from './LabeledField.styled';

interface LabeledFieldProps {
  label: string;
  children: ReactNode;
}

export const LabeledField = ({ label, children }: LabeledFieldProps) => {
  return (
    <FieldWrapper>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </FieldWrapper>
  );
};
