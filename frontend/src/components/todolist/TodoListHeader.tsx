import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlineIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
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
  onEditClick: () => void;
  onDeleteClick: () => void;
};

export function TodoListHeader({
  listName,
  showDone,
  onShowDoneChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: TodoListHeaderProps) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography variant="h5">My Todos - {listName}</Typography>
        <Tooltip title="Edit Todo List" enterDelay={500} enterNextDelay={500}>
          <IconButton aria-label="Edit todo list" size="small" onClick={onEditClick}>
            <EditOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
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
          <Fab
            size="small"
            aria-label="Delete todo list"
            onClick={onDeleteClick}
            sx={{ bgcolor: 'grey.400', '&:hover': { bgcolor: 'grey.500' } }}
          >
            <DeleteOutlineIcon />
          </Fab>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
