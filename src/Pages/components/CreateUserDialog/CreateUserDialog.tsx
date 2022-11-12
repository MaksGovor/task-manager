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
import { Avatar, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Transition } from '../shared/Transition';
import { userEntity } from 'shared/utils/entity';
import { useMutation, useQueryClient } from 'react-query';
import { UserRequestDto, UsersService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';

export default function CreateUserDialog() {
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [firstName, setFirstName] = React.useState<string>('');
	const [lastName, setLastName] = React.useState<string>('');
	const [login, setLogin] = React.useState<string>('');
	const [passwordHash, setPasswordHash] = React.useState<string>('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { mutate: createUser, isLoading: isCreateLoading } = useMutation(
		[userEntity],
		(user: UserRequestDto) => {
			return UsersService.usersPost(user);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(userEntity);
				setOpen(false);
			},
		},
	);

	const handleSave = () => {
		const user: UserRequestDto = {
			FirstName: firstName,
			LastName: lastName,
			Login: login,
			PasswordHash: passwordHash,
		};

		createUser(user);
	};

	return (
		<div>
			<ListItem autoFocus button onClick={handleClickOpen}>
				<ListItemAvatar>
					<Avatar>
						<AddIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary='Add account' />
			</ListItem>
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
						<IconButton edge='start' color='inherit' onClick={handleSave} aria-label='close'>
							<SaveIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem>
						<TextField
							fullWidth
							label='Name'
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<TextField
							fullWidth
							label='Surname'
							value={lastName}
							onChange={e => setLastName(e.target.value)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<TextField
							fullWidth
							required
							label='Login'
							value={login}
							onChange={e => setLogin(e.target.value)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<TextField
							fullWidth
							required
							label='Password'
							value={passwordHash}
							onChange={e => setPasswordHash(e.target.value)}
						/>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}
