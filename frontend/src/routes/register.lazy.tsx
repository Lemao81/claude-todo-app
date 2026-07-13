import { createLazyFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '#/components/page/RegisterPage';

export const Route = createLazyFileRoute('/register')({
  component: RegisterPage,
});
