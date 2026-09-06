import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from '#/theme';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={theme} defaultMode="dark" noSsr>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
