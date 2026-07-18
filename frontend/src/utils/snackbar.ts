export type SnackbarSeverity = 'info' | 'error';

type SnackbarListener = (
  message: string,
  severity?: SnackbarSeverity,
  hideDuration?: number,
) => void;

let listener: SnackbarListener | null = null;

export function setSnackbarListener(newListener: SnackbarListener | null): void {
  listener = newListener;
}

export function showSnackbar(
  message: string,
  severity: SnackbarSeverity = 'info',
  hideDuration?: number,
): void {
  listener?.(message, severity, hideDuration);
}
