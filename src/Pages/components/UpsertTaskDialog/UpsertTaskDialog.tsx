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
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Transition } from '../shared/Transition';
import {
	ProjectResponseDto,
	TaskRequestDto,
	TaskResponseDto,
	TasksService,
	UserResponseDto,
} from 'clients/CoreService';
import { taskEntity } from 'shared/utils/entity';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';

export interface UpsertTaskDialogProps {
	taskDto?: TaskResponseDto;
	isNew: boolean;
	users: UserResponseDto[];
	projects: ProjectResponseDto[];
}

export default function UpsertTaskDialog({
	taskDto,
	isNew,
	users,
	projects,
}: UpsertTaskDialogProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [taskName, setTaskName] = React.useState(taskDto?.TaskName || '');
	const [taskDescription, setTaskDescription] = React.useState(taskDto?.Description || '');
	const [priority, setPriority] = React.useState(taskDto?.Priority);
	const [executor, setExecutor] = React.useState(taskDto?.Executor.UserId);
	const [project, setProject] = React.useState(taskDto?.Project.ProjectId);
	const [startDate, setStartDate] = React.useState<Date | null>(new Date(taskDto?.StartDate || ''));
	const [endDate, setEndDate] = React.useState<Date | null>(new Date(taskDto?.EndDate || ''));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { mutate: createTask, isLoading: isCreateLoading } = useMutation(
		[taskEntity],
		(task: TaskRequestDto) => {
			return TasksService.tasksPost(task);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(taskEntity);
				setOpen(false);
			},
		},
	);

	const { mutate: updateTask, isLoading: isUpdateLoading } = useMutation(
		[taskEntity],
		(task: TaskRequestDto) => {
			return TasksService.tasksPut1(taskDto?.TaskId || 0, task);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(taskEntity);
				setOpen(false);
			},
		},
	);

	const handleSave = () => {
		const task: TaskRequestDto = {
			TaskName: taskName,
			Description: taskDescription,
			Priority: priority || 1,
			Status: taskDto?.Status || 0,
			StartDate: startDate?.toUTCString(),
			EndDate: endDate?.toUTCString(),
			ProjectId: project || 0,
			ExecutorId: executor || 0,
		};

		!isNew && taskDto?.TaskId ? updateTask(task) : createTask(task);
	};

	return (
		<div>
			{isNew ? (
				<>
					<Typography variant='overline' component='div'>
						Tasks for project
					</Typography>
					<Button
						variant='outlined'
						onClick={handleClickOpen}
						sx={{ maxHeight: 20 }}
						startIcon={<AddIcon />}
					>
						Add new task
					</Button>
				</>
			) : (
				<IconButton aria-label='update' size='large' onClick={handleClickOpen}>
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
				<List>
					<ListItem>
						<TextField
							fullWidth
							required
							label='Task Name'
							value={taskName}
							onChange={e => setTaskName(e.target.value)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<TextField
							fullWidth
							required
							label='Priority'
							value={priority}
							onChange={e => setPriority(+e.target.value)}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label='Start Date'
								value={startDate}
								onChange={newValue => {
									setStartDate(newValue);
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
							label='Executor'
							select
							value={executor}
							onChange={e => setExecutor(+e.target.value)}
						>
							{users.map(user => (
								<MenuItem key={user.UserId} value={user.UserId}>
									{`${user.FirstName} (${user.Login})`}
								</MenuItem>
							))}
						</TextField>
					</ListItem>
					<Divider />
					<ListItem>
						<TextField
							fullWidth
							label='Project'
							select
							value={project}
							onChange={e => setProject(+e.target.value)}
						>
							{projects.map(project => (
								<MenuItem key={project.ProjectId} value={project.ProjectId}>
									{project.ProjectName}
								</MenuItem>
							))}
						</TextField>
					</ListItem>
					<Divider />
					<ListItem>
						<TextField
							fullWidth
							label='Task Description'
							value={taskDescription}
							multiline
							rows={4}
							onChange={e => setTaskDescription(e.target.value)}
						/>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
}
