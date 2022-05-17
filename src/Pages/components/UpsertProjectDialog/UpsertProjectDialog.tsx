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
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, ListItemAvatar, ListItemText, MenuItem, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Transition } from '../shared/Transition';
import {
	ProjectRequestDto,
	ProjectResponseDto,
	ProjectsService,
	UserResponseDto,
} from 'clients/CoreService';
import { useMutation, useQueryClient } from 'react-query';
import { projectEntity } from 'shared/utils/entity';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';

export interface UpsertProjectDialogProps {
	isNew: boolean;
	users: UserResponseDto[];
	projectDto?: ProjectResponseDto;
}

export default function UpsertProjectDialog({
	isNew,
	users,
	projectDto,
}: UpsertProjectDialogProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [projectName, setProjectName] = React.useState<string>(
		projectDto ? projectDto.ProjectName : '',
	);
	const [beginDate, setBeginDate] = React.useState<Date | null>(
		new Date(projectDto?.BeginDate || ''),
	);
	const [endDate, setEndDate] = React.useState<Date | null>(new Date(projectDto?.EndDate || ''));
	const [ownerId, setOwnerId] = React.useState<number | undefined>(projectDto?.Owner.UserId);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { mutate: createProject, isLoading: isCreateLoading } = useMutation(
		[projectEntity],
		(project: ProjectRequestDto) => {
			return ProjectsService.projectsPost(project);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(projectEntity);
				setOpen(false);
			},
		},
	);

	const { mutate: updateProject, isLoading: isUpdateLoading } = useMutation(
		[projectEntity],
		(project: ProjectRequestDto) => {
			return ProjectsService.projectsPut(projectDto?.ProjectId || 0, project);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(projectEntity);
				setOpen(false);
			},
		},
	);

	const handleSave = () => {
		const project: ProjectRequestDto = {
			ProjectName: projectName,
			BeginDate: beginDate?.toUTCString(),
			EndDate: endDate?.toUTCString(),
			OwnerId: ownerId || 0,
		};

		!isNew && projectDto?.ProjectId ? updateProject(project) : createProject(project);
	};

	return (
		<div>
			{isNew ? (
				<ListItem autoFocus button onClick={handleClickOpen}>
					<ListItemAvatar>
						<Avatar>
							<AddIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary='Add project' />
				</ListItem>
			) : (
				<IconButton
					aria-label='update'
					size='large'
					onClick={e => {
						e.stopPropagation();
						handleClickOpen();
					}}
				>
					<EditIcon fontSize='inherit' />
				</IconButton>
			)}
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
				<List onClick={e => e.stopPropagation()}>
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
							{users.map(user => (
								<MenuItem key={user.UserId} value={user.UserId}>
									{`${user.FirstName} (${user.Login})`}
								</MenuItem>
							))}
						</TextField>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}
