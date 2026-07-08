import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './components/provider/AppThemeProvider';
import { AvatarProvider } from './components/provider/AvatarProvider';
import { SnackbarProvider } from './components/provider/SnackbarProvider';
import { TodoListsProvider } from './components/provider/TodoListsProvider';
import { UserInfoProvider } from './components/provider/UserInfoProvider';
import { router } from './router';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AppThemeProvider>
      <SnackbarProvider>
        <UserInfoProvider>
          <AvatarProvider>
            <TodoListsProvider>
              <RouterProvider router={router} />
            </TodoListsProvider>
          </AvatarProvider>
        </UserInfoProvider>
      </SnackbarProvider>
    </AppThemeProvider>,
  );
}
