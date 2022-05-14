import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const users = [
  {
    value: '1',
    label: 'auser',
  },
  {
    value: '2',
    label: 'buser',
  },
];

export default function CreateUserDialog() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [login, setLogin] = React.useState<string>("");
  const [passwordHash, setPasswordHash] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleClickOpen}>
        <AddIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              fullWidth 
              label="Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              fullWidth 
              label="Surname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              fullWidth
              required
              label="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              fullWidth 
              required
              label="Password"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
