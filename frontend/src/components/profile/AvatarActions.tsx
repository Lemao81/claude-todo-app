import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { deleteAvatar, hasAvatar, uploadAvatar } from '#/api/userApi';
import { ConfirmationDialog } from '#/components/ConfirmationDialog';
import { useAvatar } from '#/components/provider/AvatarProvider';
import { useSnackbar } from '#/components/provider/SnackbarProvider';

export function AvatarActions() {
  const { avatarVersion, refreshAvatar } = useAvatar();
  const { showSnackbar } = useSnackbar();
  const [avatarExists, setAvatarExists] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    hasAvatar().then(setAvatarExists);
  }, []);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const success = await uploadAvatar(file);
    if (success) {
      setAvatarExists(true);
      refreshAvatar();
      showSnackbar('Avatar uploaded successfully');
    }

    e.target.value = '';
  }

  async function handleAvatarDelete() {
    const success = await deleteAvatar();
    if (!success) {
      showSnackbar('Failed to delete avatar', 'error');

      return;
    }

    setAvatarExists(false);
    refreshAvatar();
    showSnackbar('Avatar deleted successfully');
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" component="label">
          Upload Avatar
          <input type="file" hidden accept="image/jpeg,image/png" onChange={handleAvatarChange} />
        </Button>
      </Stack>
      {avatarExists ? (
        <Box sx={{ position: 'relative', width: 160, mt: 4 }}>
          <Avatar
            src={`/api/users/avatar?v=${avatarVersion}`}
            alt="Avatar"
            sx={{ width: 160, height: 160 }}
          />
          <Tooltip title="Delete Avatar" enterDelay={500} enterNextDelay={500}>
            <IconButton
              aria-label="Delete avatar"
              size="small"
              color="error"
              onClick={() => setConfirmOpen(true)}
              sx={{
                position: 'absolute',
                right: -1.5,
                bottom: -1.5,
                bgcolor: 'grey.300',
                boxShadow: 1,
                '&:hover': { bgcolor: 'grey.400' },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box
          sx={{
            width: 160,
            height: 160,
            mt: 4,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No avatar
          </Typography>
        </Box>
      )}
      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Avatar"
        message="Are you sure you want to delete your avatar?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleAvatarDelete}
      />
    </>
  );
}
