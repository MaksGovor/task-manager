import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { UserResponseDto } from 'clients/CoreService';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateUserDialog from '../CreateUserDialog';

const users: UserResponseDto[] = [
	{
		UserId: 1,
		FirstName: 'Max',
		LastName: 'Maxim',
		Login: 'mm',
	},
	{
		UserId: 2,
		FirstName: 'Tima',
		LastName: 'R',
		Login: 'tt',
	},
	{
		UserId: 3,
		FirstName: 'Alina',
		LastName: 'Maxim',
		Login: 'alina',
	},
	{
		UserId: 4,
		FirstName: 'Mark',
		LastName: 'ma',
		Login: 'mm',
	},
];

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value: string) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
			<DialogTitle>Accounts</DialogTitle>
			<List sx={{ pt: 0 }}>
				{users.map(user => (
					<ListItem button onClick={() => handleListItemClick(user.Login)} key={user.UserId}>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={user.Login} />
						<IconButton
							aria-label='delete'
							onClick={e => {
								e.stopPropagation();
								console.log(user.UserId);
							}}
						>
							<DeleteIcon />
						</IconButton>
					</ListItem>
				))}
				<CreateUserDialog></CreateUserDialog>
			</List>
		</Dialog>
	);
}

export default function UserListDialog() {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(users[1].Login);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<Box sx={{ maxWidth: 300 }}>
			<Typography variant='overline' component='div'>
				User: {selectedValue}
			</Typography>
			<Button variant='outlined' onClick={handleClickOpen} sx={{ maxHeight: 20 }}>
				Manage users
			</Button>
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
		</Box>
	);
}