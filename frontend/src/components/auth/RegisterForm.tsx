import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { register } from '#/services/api/authApi';
import { showSnackbar } from '#/services/state/snackbar';

export function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const errorText = await register({
        userName: value.username,
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        password: value.password,
      });
      if (errorText !== null) {
        setError(errorText);

        return;
      }

      showSnackbar('Registration successful');

      navigate({ to: '/login' });
    },
  });

  return (
    <Stack
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      spacing={2}
    >
      <form.Field name="username">
        {(field) => (
          <TextField
            label="Username"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            autoComplete="username"
            autoFocus
            required
            fullWidth
          />
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <TextField
            label="Email"
            type="email"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            autoComplete="email"
            required
            fullWidth
          />
        )}
      </form.Field>
      <form.Field name="firstName">
        {(field) => (
          <TextField
            label="First name"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            autoComplete="given-name"
            fullWidth
          />
        )}
      </form.Field>
      <form.Field name="lastName">
        {(field) => (
          <TextField
            label="Last name"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            autoComplete="family-name"
            fullWidth
          />
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <TextField
            label="Password"
            type="password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            autoComplete="new-password"
            required
            fullWidth
          />
        )}
      </form.Field>
      <form.Field
        name="passwordConfirmation"
        validators={{
          onChangeListenTo: ['password'],
          onChange: ({ value, fieldApi }) =>
            value !== '' && value !== fieldApi.form.getFieldValue('password')
              ? 'Passwords do not match'
              : undefined,
        }}
      >
        {(field) => (
          <TextField
            label="Confirm password"
            type="password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            autoComplete="new-password"
            error={field.state.meta.errors.length > 0}
            helperText={field.state.meta.errors[0]}
            required
            fullWidth
          />
        )}
      </form.Field>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <form.Subscribe
        selector={(state) =>
          !!state.values.username &&
          !!state.values.email &&
          !!state.values.password &&
          state.values.password === state.values.passwordConfirmation
        }
      >
        {(canSubmit) => (
          <Button type="submit" variant="contained" disabled={!canSubmit}>
            Sign up
          </Button>
        )}
      </form.Subscribe>
    </Stack>
  );
}
