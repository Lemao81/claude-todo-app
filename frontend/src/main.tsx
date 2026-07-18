import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './components/provider/AppThemeProvider';
import { AvatarProvider } from './components/provider/AvatarProvider';
import { SearchProvider } from './components/provider/SearchProvider';
import { TodoListsProvider } from './components/provider/TodoListsProvider';
import { UserInfoProvider } from './components/provider/UserInfoProvider';
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
