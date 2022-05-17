import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
import { ProjectResponseDto, ProjectsService, UserResponseDto } from 'clients/CoreService';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpsertProjectDialog from '../UpsertProjectDialog';
import { useMutation, useQueryClient } from 'react-query';
import { projectEntity, taskEntity } from 'shared/utils/entity';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string, id?: number) => void;
	projects: ProjectResponseDto[];
	users: UserResponseDto[];
}

function SimpleDialog(props: SimpleDialogProps) {
	const queryClient = useQueryClient();
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value: string, id?: number) => {
		onClose(value, id);
	};

	const { mutate: deleteProject, isLoading: isDeleteLoading } = useMutation(
		[projectEntity, taskEntity],
		(id: number) => {
			return ProjectsService.projectsDelete(id);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries([projectEntity, taskEntity]);
			},
		},
	);

	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
			<DialogTitle>Projects</DialogTitle>
			<List sx={{ pt: 0 }}>
				{props.projects.map(project => (
					<ListItem
						button
						onClick={() => handleListItemClick(project.ProjectName, project.ProjectId)}
						key={project.ProjectId}
					>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={project.ProjectName} />
						<IconButton
							aria-label='delete'
							onClick={e => {
								e.stopPropagation();
								if (project.ProjectId && props.projects.length > 1)
									deleteProject(project.ProjectId);
							}}
						>
							<DeleteIcon />
						</IconButton>
						<UpsertProjectDialog
							isNew={false}
							users={props.users}
							projectDto={project}
						></UpsertProjectDialog>
					</ListItem>
				))}
				<UpsertProjectDialog isNew={true} users={props.users}></UpsertProjectDialog>
			</List>
		</Dialog>
	);
}

export interface ProjectListDialogProps {
	projects: ProjectResponseDto[];
	users: UserResponseDto[];
	setCurrentProject: Dispatch<SetStateAction<number | undefined>>;
}

export default function ProjectListDialog({
	projects,
	users,
	setCurrentProject,
}: ProjectListDialogProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(
		projects[0] ? projects[0].ProjectName : '',
	);
	const [selectedId, setSelectedId] = React.useState(projects[0] ? projects[0].ProjectId : 0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string, id?: number) => {
		setOpen(false);
		setSelectedValue(value);
		setSelectedId(id);
	};

	useEffect(() => {
		if (selectedId) setCurrentProject(selectedId);
	}, [selectedId]);

	return (
		<Box sx={{ maxWidth: 300 }}>
			<Typography variant='overline' component='div'>
				Project: {selectedValue}
			</Typography>
			<Button variant='outlined' onClick={handleClickOpen} sx={{ maxHeight: 20 }}>
				Manage projects
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				projects={projects}
				users={users}
			/>
		</Box>
	);
}
