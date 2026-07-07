import ChecklistIcon from '@mui/icons-material/Checklist';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type SidebarTodosItemProps = {
  open: boolean;
  disabled: boolean;
  onToggle: () => void;
};

export function SidebarTodosItem({ open, disabled, onToggle }: SidebarTodosItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton disabled={disabled} onClick={onToggle}>
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText primary="Todos" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
    </ListItem>
  );
}
