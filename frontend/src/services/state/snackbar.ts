import { Store } from '@tanstack/react-store';

export type SnackbarSeverity = 'info' | 'error';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  hideDuration: number;
};

export const snackbarStore = new Store<SnackbarState>({
  open: false,
  message: '',
  severity: 'info',
  hideDuration: 2000,
});

export function showSnackbar(
  message: string,
  severity: SnackbarSeverity = 'info',
  hideDuration?: number,
): void {
  snackbarStore.setState(() => ({
    open: true,
    message,
    severity,
    hideDuration: hideDuration ?? (severity === 'error' ? 5000 : 2000),
  }));
}

export function closeSnackbar(): void {
  snackbarStore.setState((state) => ({ ...state, open: false }));
}
