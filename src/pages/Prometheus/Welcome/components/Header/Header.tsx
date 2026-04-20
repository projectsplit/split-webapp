import { HeaderSection, Headline, Lead } from './Header.styled';

export const Header = () => {
  return (
    <HeaderSection>
      <Headline>
        The Paradigm <span className="accent">Shift</span>
      </Headline>
      <Lead>
        Prometheus is an institutional-grade risk governor built to stress-test
        your total net worth. By leveraging the same actuarial frameworks used
        by global banks and insurers, we move beyond simple tracking to reveal
        your true financial resilience. Prometheus doesn’t just count your
        wealth—it pressure-tests it against 1,000,000 possible futures.
      </Lead>
    </HeaderSection>
  );
};
