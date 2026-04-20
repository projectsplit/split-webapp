import {
  HeroSection,
  Tagline,
  Pulse,
  TaglineText,
  Title,
  Lead,
} from './Hero.styled';

export const Hero = () => {
  return (
    <HeroSection>
      <Tagline>
        <Pulse />
        <TaglineText>System Configuration</TaglineText>
      </Tagline>
      <Title>
        Architecture <span className="accent">Setup</span>
      </Title>
      <Lead>
        Define your financial exposure and lifecycle stressors. Our Monte Carlo
        engine will use these parameters to simulate 10,000 wealth trajectories.
      </Lead>
    </HeroSection>
  );
};
