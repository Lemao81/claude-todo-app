import { QueryCache, QueryClient } from '@tanstack/react-query';
import { createRouter, isRedirect } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { UnauthorizedError } from './utils/errors';
import { showSnackbar } from './utils/snackbar';

export type RouterContext = {
  queryClient: QueryClient;
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
  queryCache: new QueryCache({
    onError: (error): void => {
      if (isRedirect(error)) {
        router.navigate(error.options);
      } else if (!(error instanceof UnauthorizedError)) {
        showSnackbar(error.message, 'error');
      }
    },
  }),
});

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
