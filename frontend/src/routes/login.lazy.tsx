import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute } from '@tanstack/react-router';
import { LoginForm } from '#/components/login/LoginForm';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Log in
      </Typography>
      <LoginForm />
    </Box>
  );
}
