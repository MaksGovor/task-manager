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
import { UserResponseDto, UsersService } from 'clients/CoreService';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateUserDialog from '../CreateUserDialog';
import { projectEntity, taskEntity, userEntity } from 'shared/utils/entity';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
	users: UserResponseDto[];
}

function SimpleDialog(props: SimpleDialogProps) {
	const queryClient = useQueryClient();
	const snackbar = useSnackbar();
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value: string) => {
		onClose(value);
	};

	const { mutate: deleteUser, isLoading: isDeleteLoading } = useMutation(
		[projectEntity, taskEntity, userEntity],
		(id: number) => {
			return UsersService.usersDelete(id);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries([projectEntity, taskEntity, userEntity]);
			},
		},
	);

	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
			<DialogTitle>Accounts</DialogTitle>
			<List sx={{ pt: 0 }}>
				{props.users.map(user => (
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
								if (user.UserId && props.users.length > 1) deleteUser(user.UserId);
								else snackbar.enqueueSnackbar('You can`n delete last user', { variant: 'error' });
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

export interface UserListDialogProps {
	users: UserResponseDto[];
}

export default function UserListDialog({ users }: UserListDialogProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(users[0] ? users[0].Login : '');

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
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} users={users} />
		</Box>
	);
}
