import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

type AuthPageLayoutProps = {
  title: string;
  titleDataCy?: string;
  children: ReactNode;
};

export function AuthPageLayout({ title, titleDataCy, children }: AuthPageLayoutProps) {
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3 }} data-cy={titleDataCy}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
