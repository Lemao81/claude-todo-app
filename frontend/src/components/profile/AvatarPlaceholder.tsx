import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function AvatarPlaceholder() {
  return (
    <Box
      sx={{
        width: 160,
        height: 160,
        mt: 4,
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        No avatar
      </Typography>
    </Box>
  );
}
