import EditOutlineIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTodoList } from '#/providers/TodoListProvider';

type TodoListHeaderProps = {
  showDone: boolean;
  onShowDoneChange: (showDone: boolean) => void;
  onAddClick: () => void;
};

export function TodoListHeader({ showDone, onShowDoneChange, onAddClick }: TodoListHeaderProps) {
  const { listName, startEditingList } = useTodoList();

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" data-cy="todo-list-heading">
          My Todos - {listName}
        </Typography>
        <Tooltip title="Edit Todo List" enterDelay={500} enterNextDelay={500}>
          <IconButton aria-label="Edit todo list" size="small" onClick={startEditingList}>
            <EditOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showDone}
              onChange={(e) => onShowDoneChange(e.target.checked)}
              slotProps={{ input: { 'data-cy': 'show-done-switch' } }}
            />
          }
          label="Show done"
        />
        <Button variant="contained" onClick={onAddClick} data-cy="add-todo-button">
          Add ToDo
        </Button>
      </Stack>
    </Stack>
  );
}
