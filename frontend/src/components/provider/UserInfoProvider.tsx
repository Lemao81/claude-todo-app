import { createContext, useContext, useState } from 'react';
import type { UserInfo } from '#/types/userInfo';
import { USER_INFO_STORAGE_KEY } from '#/utils/constants';
import { getItem, setItem } from '#/utils/localStorage';

interface UserInfoContextValue {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextValue | null>(null);

export function useUserInfo(): UserInfoContextValue {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }

  return context;
}

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() =>
    getItem<UserInfo>(USER_INFO_STORAGE_KEY),
  );

  const setUserInfo = (userInfo: UserInfo | null): void => {
    setItem(USER_INFO_STORAGE_KEY, userInfo);
    setUserInfoState(userInfo);
  };

  const clearUserInfo = (): void => setUserInfo(null);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, clearUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
