import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

type UserAvatarProps = {
  alt: string;
};

export function UserAvatar({ alt }: UserAvatarProps) {
  const [src, setSrc] = useState('/api/users/avatar');

  return (
    <Avatar
      src={src}
      alt={alt}
      slotProps={{ img: { onError: () => setSrc('/default_avatar.jpg') } }}
      sx={{ width: 36, height: 36 }}
    />
  );
}
