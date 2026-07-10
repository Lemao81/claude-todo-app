import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { login } from '#/api/authApi';
import { useUserInfo } from '#/components/provider/UserInfoProvider';

export function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setUserInfo } = useUserInfo();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const [userInfo, errorText] = await login(username, password);
    if (errorText !== null) {
      setError(errorText);

      return;
    }

    setUserInfo(userInfo);

    navigate({ to: '/todos' });
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        autoFocus
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
      <Button type="submit" variant="contained" disabled={!username || !password}>
        Sign in
      </Button>
    </Stack>
  );
}
