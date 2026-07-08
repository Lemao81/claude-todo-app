import Typography from '@mui/material/Typography';

type ProfileFieldProps = {
  label: string;
  value: string;
};

export function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div>
      <Typography variant="h6" color="primary" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </div>
  );
}
