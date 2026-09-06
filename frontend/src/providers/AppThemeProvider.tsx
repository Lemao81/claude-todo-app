import { ThemeProvider } from '@mui/material/styles';
import { theme } from '#/theme';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme} defaultMode="dark" noSsr>
      {children}
    </ThemeProvider>
  );
}
