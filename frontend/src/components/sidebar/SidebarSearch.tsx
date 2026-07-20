import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { useSearch } from '#/components/providers/SearchProvider';
import { useUserInfo } from '#/components/providers/UserInfoProvider';

export function SidebarSearch() {
  const { userInfo } = useUserInfo();
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();

  return (
    <ListItem>
      <TextField
        fullWidth
        size="small"
        placeholder="Search todos"
        value={searchTerm}
        disabled={!userInfo}
        onChange={(e) => setSearchTerm(e.target.value)}
        slotProps={{
          input: {
            endAdornment: searchTerm ? (
              <InputAdornment position="end">
                <IconButton aria-label="Clear search" size="small" edge="end" onClick={clearSearch}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </ListItem>
  );
}
