import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { MainLayout } from '#/components/layout/MainLayout';

export function RootDocument() {
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
