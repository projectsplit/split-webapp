import { useNavigate } from 'react-router-dom';
import {
  MdHome,
  MdDashboard,
  MdQueryStats,
  MdAnalytics,
  MdSmartDisplay,
  MdPerson,
  MdCalculate,
  MdSsidChart,
} from 'react-icons/md';
import {
  DesktopSidebar,
  LogoBlock,
  LogoText,
  NavList,
  NavItem,
  MobileBar,
  MobileLogoText,
  MobileNavRow,
  MobileNavItem,
  ProfileCircle,
} from './SimNav.styled';

interface NavEntry {
  key: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  route: string;
}

const NAV_ITEMS: NavEntry[] = [
  { key: 'home', label: 'HOME', shortLabel: 'Home', icon: <MdHome />, route: '/' },
  { key: 'corr', label: 'CORRELATIONS', shortLabel: 'Corr', icon: <MdDashboard />, route: '/prometheus/correlation' },
  { key: 'sims', label: 'SIMULATIONS', shortLabel: 'Sims', icon: <MdQueryStats />, route: '/prometheus/simulations' },
  { key: 'whatif', label: 'WHAT-IF SCENARIOS', shortLabel: 'What-If', icon: <MdAnalytics />, route: '/prometheus/whatif' },
  { key: 'condprob', label: 'CONDITIONAL PROB', shortLabel: 'Cond Prob', icon: <MdCalculate />, route: '/prometheus/conditional' },
  { key: 'sensitivity', label: 'THRESHOLD SWEEP', shortLabel: 'Sweep', icon: <MdSsidChart />, route: '/prometheus/sensitivity' },
  { key: 'tail', label: 'TAIL RISK ANALYSIS', shortLabel: 'Tail', icon: <MdSmartDisplay />, route: '/prometheus/tail' },
];

interface SimNavProps {
  activeKey?: string;
}

export const SimNav = ({ activeKey = 'sims' }: SimNavProps) => {
  const navigate = useNavigate();

  return (
    <>
      <DesktopSidebar>
        <LogoBlock>
          <LogoText>PROMETHEUS</LogoText>
        </LogoBlock>
        <NavList>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.key}
              $active={item.key === activeKey}
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavList>
      </DesktopSidebar>

      <MobileBar>
        <MobileLogoText>PROMETHEUS</MobileLogoText>
        <ProfileCircle>
          <MdPerson />
        </ProfileCircle>
      </MobileBar>

      <MobileNavRow>
        {NAV_ITEMS.map((item) => (
          <MobileNavItem
            key={item.key}
            $active={item.key === activeKey}
            onClick={() => navigate(item.route)}
          >
            {item.shortLabel}
          </MobileNavItem>
        ))}
      </MobileNavRow>
    </>
  );
};
