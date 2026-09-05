import { RegisterForm } from '#/components/auth/RegisterForm';
import { AuthPageLayout } from '#/layouts/AuthPageLayout';

export function RegisterPage() {
  return (
    <AuthPageLayout title="Sign Up">
      <RegisterForm />
    </AuthPageLayout>
  );
}
