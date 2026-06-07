import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import type { TodoDto } from '#/routes/todos/index';

interface TodoCardProps {
  todo: TodoDto;
  onToggleDone: (id: number, done: boolean) => void;
}

export function TodoCard({ todo, onToggleDone }: TodoCardProps) {
  return (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
          py: 1.5,
          '&:last-child': { pb: 1.5 },
        }}
      >
        <Checkbox
          checked={todo.done}
          onChange={(e) => onToggleDone(todo.id, e.target.checked)}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleOutlineIcon />}
          color="primary"
          sx={{ p: 0, mt: 0.25 }}
        />
        <div>
          <Typography
            variant="body1"
            sx={{
              textDecoration: todo.done ? 'line-through' : 'none',
              opacity: todo.done ? 0.5 : 1,
            }}
          >
            {todo.text}
          </Typography>
          {todo.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                textDecoration: todo.done ? 'line-through' : 'none',
                opacity: todo.done ? 0.5 : 1,
              }}
            >
              {todo.description}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
