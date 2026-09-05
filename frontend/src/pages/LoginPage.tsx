import { LoginForm } from '#/components/auth/LoginForm';
import { AuthPageLayout } from '#/layouts/AuthPageLayout';

export function LoginPage() {
  return (
    <AuthPageLayout title="Sign In" titleDataCy="login-heading">
      <LoginForm />
    </AuthPageLayout>
  );
}
