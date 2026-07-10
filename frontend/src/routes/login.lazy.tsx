import { createLazyFileRoute } from '@tanstack/react-router';
import { LoginPage } from '#/components/page/LoginPage';

export const Route = createLazyFileRoute('/login')({
  component: LoginPage,
});
