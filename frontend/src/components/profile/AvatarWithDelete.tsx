import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { ConfirmationDialog } from '#/components/ConfirmationDialog';
import { useAvatar } from '#/components/providers/AvatarProvider';

type AvatarWithDeleteProps = {
  onDelete: () => Promise<void>;
};

export function AvatarWithDelete({ onDelete }: AvatarWithDeleteProps) {
  const { avatarVersion } = useAvatar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
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
      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Avatar"
        message="Are you sure you want to delete your avatar?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDelete}
      />
    </Box>
  );
}
