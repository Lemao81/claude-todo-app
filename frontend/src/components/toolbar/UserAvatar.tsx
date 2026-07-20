import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { useAvatar } from '#/components/providers/AvatarProvider';

type UserAvatarProps = {
  alt: string;
};

export function UserAvatar({ alt }: UserAvatarProps) {
  const { avatarVersion } = useAvatar();
  const [failedVersion, setFailedVersion] = useState<number | null>(null);

  const src =
    failedVersion === avatarVersion
      ? '/default_avatar.jpg'
      : `/api/users/avatar?v=${avatarVersion}`;

  return (
    <Avatar
      src={src}
      alt={alt}
      slotProps={{ img: { onError: () => setFailedVersion(avatarVersion) } }}
      sx={{ width: 36, height: 36 }}
    />
  );
}
