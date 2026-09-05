import {
  alpha,
  createTheme,
  type Theme,
  ThemeProvider,
  useColorScheme,
} from '@mui/material/styles';

type ColorMode = 'light' | 'dark';

type ColorModeValue = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#8a7526' },
        secondary: { main: '#2f6b1e' },
        background: { default: '#f3f1e7', paper: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#ba9d36' },
        secondary: { main: '#41922a' },
        background: { default: '#272a42', paper: '#1a1c2e' },
      },
    },
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
  components: {
    MuiTooltip: {
      defaultProps: {
        enterDelay: 500,
        enterNextDelay: 500,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'inherit' },
          style: ({ theme }: { theme: Theme }) => ({
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
          }),
        },
        {
          props: { variant: 'outlined', color: 'inherit' },
          style: ({ theme }: { theme: Theme }) => ({
            borderColor: alpha(theme.palette.common.white, 0.4),
            '&:hover': {
              borderColor: alpha(theme.palette.common.white, 0.7),
              backgroundColor: alpha(theme.palette.common.white, 0.1),
            },
          }),
        },
      ],
    },
  },
});

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
