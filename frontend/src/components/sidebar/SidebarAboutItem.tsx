import InfoIcon from '@mui/icons-material/Info';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createLink } from '@tanstack/react-router';

const ListItemButtonLink = createLink(ListItemButton);

export function SidebarAboutItem() {
  return (
    <ListItem disablePadding>
      <ListItemButtonLink to="/about">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButtonLink>
    </ListItem>
  );
}
