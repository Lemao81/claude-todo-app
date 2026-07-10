import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AvatarActions } from '#/components/profile/AvatarActions';
import { ProfileFields } from '#/components/profile/ProfileFields';
import type { UserInfo } from '#/types/userInfo';

type ProfilePageProps = {
  userInfo: UserInfo;
};

export function ProfilePage({ userInfo }: ProfilePageProps) {
  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <ProfileFields userInfo={userInfo} />
      <AvatarActions />
    </Box>
  );
}
