import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { theme } from '#/theme';

type ColorMode = 'light' | 'dark';

type ColorModeValue = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

export function useColorMode(): ColorModeValue {
  const { mode, systemMode, setMode } = useColorScheme();
  const colorMode: ColorMode = systemMode ?? (mode === 'light' ? 'light' : 'dark');

  const toggleColorMode = () => setMode(colorMode === 'light' ? 'dark' : 'light');

  return { mode: colorMode, toggleColorMode };
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme} defaultMode="dark" noSsr>
      {children}
    </ThemeProvider>
  );
}
