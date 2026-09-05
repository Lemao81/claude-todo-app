import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function HomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }} data-cy="home-heading">
        Welcome to Claude ToDo App
      </Typography>
    </Box>
  );
}
