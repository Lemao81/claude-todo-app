import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type TodoTextProps = {
  done: boolean;
};

export const TodoText = styled(Typography, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'done',
})<TodoTextProps>(({ done }: TodoTextProps) => ({
  textDecoration: done ? 'line-through' : 'none',
  opacity: done ? 0.5 : 1,
}));
