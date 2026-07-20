import { createContext, useContext, useState } from 'react';

interface AvatarContextValue {
  avatarVersion: number;
  refreshAvatar: () => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

export function useAvatar(): AvatarContextValue {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }

  return context;
}

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [avatarVersion, setAvatarVersion] = useState(0);

  const refreshAvatar = (): void => setAvatarVersion((version) => version + 1);

  return (
    <AvatarContext.Provider value={{ avatarVersion, refreshAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}
