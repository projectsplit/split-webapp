import { InitializeButton } from './InitializeButton';
import { InitSection } from './Initialization.styled';

interface InitializationProps {
  onInitialize?: () => void;
}

export const Initialization = ({ onInitialize }: InitializationProps) => {
  return (
    <InitSection>
      {/* <HeroImage /> */}
      <InitializeButton onClick={onInitialize} />
    </InitSection>
  );
};
