import { useColorScheme } from '@mui/material/styles';

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
