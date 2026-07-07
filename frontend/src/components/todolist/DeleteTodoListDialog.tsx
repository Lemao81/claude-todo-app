import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

type DeleteTodoListDialogProps = {
  open: boolean;
  listName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function DeleteTodoListDialog({
  open,
  listName,
  onClose,
  onConfirm,
}: DeleteTodoListDialogProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);

    try {
      await onConfirm();
      onClose();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Todo List</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the list "{listName}" and all of its todos?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleConfirm} disabled={deleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
