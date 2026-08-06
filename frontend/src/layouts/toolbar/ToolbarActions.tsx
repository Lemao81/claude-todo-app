import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { UserActions } from '#/layouts/toolbar/UserActions';
import { useColorMode } from '#/providers/AppThemeProvider';

export function ToolbarActions() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton color="inherit" onClick={toggleColorMode}>
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <UserActions />
    </>
  );
}
