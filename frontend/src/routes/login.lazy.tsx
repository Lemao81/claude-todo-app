import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { logFetchError } from '#/utils/logHelper';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      await logFetchError(res, 'Failed to log in');
      setError('Invalid username or password');

      return;
    }

    navigate({ to: '/todos' });
  }

  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Log in
      </Typography>
      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          fullWidth
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </Stack>
    </Box>
  );
}
