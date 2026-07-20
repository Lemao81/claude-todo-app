import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoginForm } from '#/components/auth/LoginForm';

export function LoginPage() {
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3 }} data-cy="login-heading">
        Sign In
      </Typography>
      <LoginForm />
    </Box>
  );
}
