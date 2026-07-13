import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { register } from '#/api/authApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';

export function RegisterForm() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const passwordMismatch = passwordConfirmation !== '' && password !== passwordConfirmation;
  const canSubmit = !!username && !!email && !!password && password === passwordConfirmation;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const errorText = await register({
      userName: username,
      email,
      firstName,
      lastName,
      password,
    });
    if (errorText !== null) {
      setError(errorText);

      return;
    }

    showSnackbar('Registration successful');

    navigate({ to: '/login' });
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        autoFocus
        required
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
        fullWidth
      />
      <TextField
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="given-name"
        fullWidth
      />
      <TextField
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        autoComplete="family-name"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
        fullWidth
      />
      <TextField
        label="Confirm password"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        autoComplete="new-password"
        error={passwordMismatch}
        helperText={passwordMismatch ? 'Passwords do not match' : undefined}
        required
        fullWidth
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Sign up
      </Button>
    </Stack>
  );
}
