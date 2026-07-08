import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { ProfileField } from '#/components/profile/ProfileField';
import type { UserInfo } from '#/types/userInfo';

type ProfileFieldsProps = {
  userInfo: UserInfo;
};

export function ProfileFields({ userInfo }: ProfileFieldsProps) {
  return (
    <Stack spacing={2} divider={<Divider />}>
      <ProfileField label="Username" value={userInfo.userName} />
      <ProfileField label="Email" value={userInfo.email} />
      <ProfileField label="First name" value={userInfo.firstName} />
      <ProfileField label="Last name" value={userInfo.lastName} />
    </Stack>
  );
}
