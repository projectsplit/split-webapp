import { Wrapper, Heading, Lead, Accent, Soft } from './Intro.styled';

export const Intro = () => {
  return (
    <Wrapper>
      <Heading>Correlation Modeling</Heading>
      <Lead>
        The <Accent>Correlation Matrix</Accent> provides a
        high-precision framework for understanding inter-asset dependencies.
        These are <Soft>prepopulated estimates</Soft> based on our statistical analysis and economic rationale. Adjust values accordingly if your views of the market and the economy are different.
      </Lead>
    </Wrapper>
  );
};
