import { useMemo } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { UserInfo } from '../../types';
import PlusGate from '../../components/Plus/PlusGate';

export default function Budget() {
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo | undefined;
  }>();

  const outletContext = useMemo(() => ({ userInfo }), [userInfo]);

  // One gate for the overview, creating a budget and managing them: all of budgeting is Plus.
  return (
    <PlusGate feature="budgeting">
      <Outlet context={outletContext} />
    </PlusGate>
  );
}
