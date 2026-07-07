import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { type FormEvent, useState } from 'react';

type AddTodoDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (text: string, description: string | null) => Promise<void>;
};

export function AddTodoDialog({ open, onClose, onCreate }: AddTodoDialogProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleClose() {
    setText('');
    setDescription('');
    onClose();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await onCreate(text.trim(), description.trim() || null);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add ToDo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={submitting || !text.trim()}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
