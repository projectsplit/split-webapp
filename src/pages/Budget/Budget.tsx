import { useMemo } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { UserInfo } from '../../types';

export default function Budget() {
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo | undefined;
  }>();

  const outletContext = useMemo(() => ({ userInfo }), [userInfo]);

  return (
    <>
      <Outlet context={outletContext} />
    </>
  );
}
