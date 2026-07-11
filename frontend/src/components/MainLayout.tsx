import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import type { ReactNode } from 'react';
import { useSearch } from '#/components/provider/SearchProvider';
import { SearchResults } from '#/components/search/SearchResults';
import { Sidebar } from '#/components/sidebar/Sidebar';
import { ToolbarActions } from '#/components/toolbar/ToolbarActions';
import { ToolbarTitle } from '#/components/toolbar/ToolbarTitle';

const DRAWER_WIDTH = 240;

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { activeSearchTerm } = useSearch();

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <ToolbarTitle />
          <ToolbarActions />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Sidebar />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {activeSearchTerm ? <SearchResults /> : children}
      </Box>
    </>
  );
}
