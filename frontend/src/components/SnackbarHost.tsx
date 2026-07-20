import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from '@tanstack/react-store';
import { closeSnackbar, snackbarStore } from '#/services/state/snackbar';

export function SnackbarHost() {
  const { open, message, severity, hideDuration } = useSelector(snackbarStore);

  return (
    <Snackbar open={open} autoHideDuration={hideDuration} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
