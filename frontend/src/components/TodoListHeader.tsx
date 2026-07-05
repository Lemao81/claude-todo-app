import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

type TodoListHeaderProps = {
  listName: string;
  showDone: boolean;
  onShowDoneChange: (showDone: boolean) => void;
  onAddClick: () => void;
};

export function TodoListHeader({
  listName,
  showDone,
  onShowDoneChange,
  onAddClick,
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
      </Stack>
    </Stack>
  );
}
