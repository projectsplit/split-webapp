import { Wrapper, Heading, Lead, Accent, Soft } from './Intro.styled';

export const Intro = () => {
  return (
    <Wrapper>
      <Heading>Correlation Modeling</Heading>
      <Lead>
        The <Accent>Iman Conover</Accent> correlation matrix provides a
        high-precision framework for understanding inter-asset dependencies.
        These are <Soft>prepopulated estimates</Soft> based on your current
        portfolio drift. Adjust values to simulate extreme market stress
        scenarios.
      </Lead>
    </Wrapper>
  );
};
