import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';

export function ToolbarTitle() {
  return (
    <Typography
      variant="h6"
      noWrap
      component={Link}
      to="/"
      sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
    >
      Claude Todo App
    </Typography>
  );
}
