import { Outlet, useOutletContext } from 'react-router-dom';
import { UserInfo } from '../../types';

export default function Budget() {
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo | undefined;
  }>();

  return (
    <>
      <Outlet context={{ userInfo }} />
    </>
  );
}
