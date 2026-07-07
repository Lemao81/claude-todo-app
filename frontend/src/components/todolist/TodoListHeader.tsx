import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

type TodoListHeaderProps = {
  listName: string;
  showDone: boolean;
  onShowDoneChange: (showDone: boolean) => void;
  onAddClick: () => void;
  onDeleteClick: () => void;
};

export function TodoListHeader({
  listName,
  showDone,
  onShowDoneChange,
  onAddClick,
  onDeleteClick,
}: TodoListHeaderProps) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Typography variant="h5">My Todos - {listName}</Typography>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <FormControlLabel
          control={
            <Switch checked={showDone} onChange={(e) => onShowDoneChange(e.target.checked)} />
          }
          label="Show done"
        />
        <Button variant="contained" onClick={onAddClick}>
          Add ToDo
        </Button>
        <Tooltip title="Delete Todo List" enterDelay={500} enterNextDelay={500}>
          <IconButton color="error" aria-label="Delete todo list" onClick={onDeleteClick}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
