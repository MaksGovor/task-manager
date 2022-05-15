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
import AddIcon from '@mui/icons-material/Add';
import { MenuItem, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Transition } from '../shared/Transition';

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

export default function UpsertProjectDialog() {
	const [open, setOpen] = React.useState(false);
	const [projectName, setProjectName] = React.useState<string>();
	const [beginDate, setBeginDate] = React.useState<Date | null>();
	const [endDate, setEndDate] = React.useState<Date | null>();
	const [ownerId, setOwnerId] = React.useState<number>();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label='delete' size='large' onClick={handleClickOpen}>
				<AddIcon fontSize='inherit' />
			</IconButton>
			<Dialog
				fullWidth
				maxWidth={'xs'}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<CloseIcon />
						</IconButton>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<SaveIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem>
						<TextField
							fullWidth
							required
							label='Project Name'
							value={projectName}
							onChange={e => setProjectName(e.target.value)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label='Start Date'
								value={beginDate}
								onChange={newValue => {
									setBeginDate(newValue);
								}}
								renderInput={params => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</ListItem>
					<ListItem>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label='Deadline'
								value={endDate}
								onChange={newValue => {
									setEndDate(newValue);
								}}
								renderInput={params => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</ListItem>
					<ListItem>
						<TextField
							fullWidth
							required
							label='Owner'
							select
							value={ownerId}
							onChange={e => setOwnerId(+e.target.value)}
						>
							{users.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}
