import { createRootRouteWithContext } from '@tanstack/react-router';
import { RootDocument } from '#/components/layout/RootDocument.tsx';
import type { RouterContext } from '#/router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootDocument,
});
