import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './components/AppThemeProvider';
import { UserInfoProvider } from './components/UserInfoProvider';
import { router } from './router';

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AppThemeProvider>
      <UserInfoProvider>
        <RouterProvider router={router} />
      </UserInfoProvider>
    </AppThemeProvider>,
  );
}
