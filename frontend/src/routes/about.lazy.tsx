import { createLazyFileRoute } from '@tanstack/react-router';
import { AboutPage } from '#/components/page/AboutPage';

export const Route = createLazyFileRoute('/about')({
  component: AboutPage,
});
