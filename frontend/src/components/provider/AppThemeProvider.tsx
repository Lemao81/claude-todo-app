import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';
import { COLOR_MODE_STORAGE_KEY } from '#/utils/constants';
import { getItem, setItem } from '#/utils/localStorage';

type ColorMode = 'light' | 'dark';

interface ColorModeContextValue {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(
    () => getItem<ColorMode>(COLOR_MODE_STORAGE_KEY) ?? 'dark',
  );

  const toggleColorMode = () =>
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      setItem(COLOR_MODE_STORAGE_KEY, next);

      return next;
    });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: '#ba9d36' },
          secondary: { main: '#41922a' },
          mode,
          background: { default: '#272a42', paper: '#1a1c2e' },
        },
        typography: {
          fontFamily: 'Comic Sans MS',
          fontSize: 15,
          fontWeightLight: 100,
          fontWeightRegular: 200,
          fontWeightMedium: 300,
          fontWeightBold: 500,
        },
        spacing: 7,
        shape: {
          borderRadius: 14,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
