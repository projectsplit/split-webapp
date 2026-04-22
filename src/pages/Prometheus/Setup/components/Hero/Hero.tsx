import {
  HeroSection,
  Title,
  Lead,
} from './Hero.styled';

export const Hero = () => {
  return (
    <HeroSection>
   
      <Title>
        Architecture <span className="accent">Setup</span>
      </Title>
      <Lead>
        Define your financial exposure and lifecycle stressors. The engine
         will use these parameters to simulate 1,000,000 wealth trajectories.
      </Lead>
    </HeroSection>
  );
};
