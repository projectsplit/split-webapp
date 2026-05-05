const routes = {
  ROOT: '/',
  ABOUT: '/about',
  AUTH: '/welcome',
  CREATE: '/entry',
  GOOGLE_REDIRECT: '/google/redirect',
  USER_INVITATIONS: '/invitations',
  JOIN: '/j/:code',
  GROUP: '/shared/:groupid',
  PROMETHEUS_WELCOME: '/prometheus/welcome',
  PROMETHEUS_SETUP: '/prometheus/setup',
  PROMETHEUS_CORRELATION: '/prometheus/correlation',
  PROMETHEUS_SIMULATIONS: '/prometheus/simulations',
  PROMETHEUS_PERCENTILE_DETAIL: '/prometheus/simulations/:percentile',
  PROMETHEUS_WHATIF: '/prometheus/whatif',
  PROMETHEUS_CONDITIONAL: '/prometheus/conditional',
};

export default routes;
