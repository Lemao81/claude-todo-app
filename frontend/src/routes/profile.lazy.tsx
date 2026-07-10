import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ProfilePage } from '#/components/page/ProfilePage';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo) {
      navigate({ to: '/login' });
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }

  return <ProfilePage userInfo={userInfo} />;
}
