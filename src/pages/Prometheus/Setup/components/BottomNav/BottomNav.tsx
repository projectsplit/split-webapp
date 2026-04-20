import {
  MdInsights,
  MdAccountBalanceWallet,
  MdSecurity,
  MdLock,
} from 'react-icons/md';
import { Nav, Item, ItemLabel } from './BottomNav.styled';

type BottomNavKey = 'oracle' | 'wealth' | 'risk' | 'vault';

const ITEMS: { key: BottomNavKey; label: string; icon: React.ComponentType }[] =
  [
    { key: 'oracle', label: 'Oracle', icon: MdInsights },
    { key: 'wealth', label: 'Wealth', icon: MdAccountBalanceWallet },
    { key: 'risk', label: 'Risk', icon: MdSecurity },
    { key: 'vault', label: 'Vault', icon: MdLock },
  ];

interface BottomNavProps {
  active?: BottomNavKey;
}

export const BottomNav = ({ active = 'risk' }: BottomNavProps) => {
  return (
    <Nav>
      {ITEMS.map(({ key, label, icon: Icon }) => (
        <Item key={key} $active={active === key}>
          <Icon />
          <ItemLabel>{label}</ItemLabel>
        </Item>
      ))}
    </Nav>
  );
};
