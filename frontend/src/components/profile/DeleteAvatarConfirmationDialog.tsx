import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

type DeleteAvatarConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
};

export function DeleteAvatarConfirmationDialog({
  open,
  onClose,
  onDelete,
}: DeleteAvatarConfirmationDialogProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);

    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Avatar</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete your avatar?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDelete} disabled={deleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
