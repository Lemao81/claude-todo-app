import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { AvatarProvider } from './providers/AvatarProvider';
import { SearchProvider } from './providers/SearchProvider';
import { TodoListsProvider } from './providers/TodoListsProvider';
import { UserInfoProvider } from './providers/UserInfoProvider';
import { SnackbarHost } from './components/SnackbarHost';
import { queryClient, router } from './router';

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <UserInfoProvider>
          <AvatarProvider>
            <TodoListsProvider>
              <SearchProvider>
                <RouterProvider router={router} />
              </SearchProvider>
            </TodoListsProvider>
          </AvatarProvider>
        </UserInfoProvider>
        <SnackbarHost />
      </AppThemeProvider>
    </QueryClientProvider>,
  );
}
