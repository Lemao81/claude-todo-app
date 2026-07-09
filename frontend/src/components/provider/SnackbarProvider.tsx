import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useContext, useState } from 'react';

type SnackbarSeverity = 'info' | 'error';

interface SnackbarContextValue {
  showSnackbar: (message: string, severity?: SnackbarSeverity, hideDuration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarSeverity>('info');
  const [hideDuration, setHideDuration] = useState(5000);

  const showSnackbar = (
    message: string,
    severity: SnackbarSeverity = 'info',
    hideDuration?: number,
  ): void => {
    setMessage(message);
    setSeverity(severity);
    setHideDuration(hideDuration ?? (severity === 'error' ? 5000 : 2000));
    setOpen(true);
  };

  const handleClose = (): void => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={hideDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
