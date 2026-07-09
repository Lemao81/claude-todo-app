import { useSortable } from '@dnd-kit/react/sortable';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditOutlineIcon from '@mui/icons-material/EditOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTodos } from '#/components/provider/TodosProvider';
import type { TodoDto } from '#/types/todo';

type TodoCardProps = {
  todo: TodoDto;
  index: number;
};

export function TodoCard({ todo, index }: TodoCardProps) {
  const { editingTodoId, toggleTodoDone, removeTodo, startEditing } = useTodos();
  const { ref, handleRef, isDragging } = useSortable({ id: todo.id, index });
  const isEditing = todo.id === editingTodoId;

  return (
    <Card
      ref={ref}
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        mb: 1.5,
        opacity: isDragging ? 0.4 : 1,
        ...(isEditing && { borderColor: 'primary.main', outline: '1px solid', outlineColor: 'primary.main' }),
      }}
    >
      <Box
        ref={handleRef}
        aria-label="Drag to reorder"
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 0.5,
          color: 'text.secondary',
          cursor: 'grab',
          touchAction: 'none',
        }}
      >
        <DragIndicatorIcon />
      </Box>
      <CardActionArea onClick={() => toggleTodoDone(todo.id, !todo.done)} sx={{ flex: 1 }}>
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
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
            color="primary"
            disableRipple
            tabIndex={-1}
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
      </CardActionArea>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
        <Tooltip title="Edit Todo" enterDelay={500} enterNextDelay={500}>
          <IconButton aria-label="Edit todo" onClick={() => startEditing(todo.id)} size="small">
            <EditOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Todo" enterDelay={500} enterNextDelay={500}>
          <IconButton aria-label="Delete todo" onClick={() => removeTodo(todo.id)} size="small">
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
