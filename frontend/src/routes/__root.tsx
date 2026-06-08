import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { MainLayout } from '#/components/MainLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <MainLayout>
        <Outlet />
      </MainLayout>

      <TanStackDevtools
        config={{ position: 'bottom-right' }}
        plugins={[{ name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel /> }]}
      />
    </Box>
  );
}
