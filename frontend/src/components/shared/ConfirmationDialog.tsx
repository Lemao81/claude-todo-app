import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onClose,
  onConfirm,
}: ConfirmationDialogProps) {
  const [confirming, setConfirming] = useState(false);

  async function handleConfirm() {
    setConfirming(true);

    try {
      await onConfirm();
      onClose();
    } finally {
      setConfirming(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" data-cy="confirmation-dialog">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-cy="confirmation-dialog-cancel">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          disabled={confirming}
          data-cy="confirmation-dialog-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
