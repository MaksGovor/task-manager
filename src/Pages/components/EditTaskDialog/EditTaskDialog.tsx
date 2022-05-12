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
import EditIcon from '@mui/icons-material/Edit';
import { MenuItem, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TaskProps } from '../Task/Task';

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

export default function EditTaskDialog({taskDto}: TaskProps) {
  const [open, setOpen] = React.useState(false);
  const [taskName, setTaskName] = React.useState(taskDto.TaskName);
  const [taskDescription, setTaskDescription] = React.useState(taskDto.Description || '');
  const [executor, setExecutor] = React.useState(taskDto.Executor.UserId);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date(taskDto.StartDate || ''));
  const [endDate, setEndDate] = React.useState<Date | null>(new Date(taskDto.EndDate || ''));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" size="large" onClick={handleClickOpen}>
        <EditIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
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
              required
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Deadline"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth 
              label="Executor"
              select
              value={executor}
              onChange={(e) => setExecutor(+e.target.value)}
            >{users.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </TextField>
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              fullWidth 
              label="Task Description"
              value={taskDescription}
              multiline
              rows={4}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
