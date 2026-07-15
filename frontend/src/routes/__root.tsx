import { createRootRoute } from '@tanstack/react-router';
import { RootDocument } from '#/components/layout/RootDocument.tsx';

export const Route = createRootRoute({
  component: RootDocument,
});
