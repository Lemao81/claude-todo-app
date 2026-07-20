import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RegisterForm } from '#/components/register/RegisterForm';

export function RegisterPage() {
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Sign Up
      </Typography>
      <RegisterForm />
    </Box>
  );
}
