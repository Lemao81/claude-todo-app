import Stack from '@mui/material/Stack';
import type { ReactNode } from 'react';

type PanelHeaderRowProps = {
  children: ReactNode;
};

export function PanelHeaderRow({ children }: PanelHeaderRowProps) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      {children}
    </Stack>
  );
}
