import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { useColorMode } from '#/providers/AppThemeProvider';
import { UserActions } from '#/components/toolbar/UserActions';

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
