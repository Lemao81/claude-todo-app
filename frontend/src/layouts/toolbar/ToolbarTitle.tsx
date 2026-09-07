import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';

export function ToolbarTitle() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/"
        sx={{ display: 'inline-block', color: 'inherit', textDecoration: 'none' }}
      >
        Claude Todo App
      </Typography>
    </Box>
  );
}
