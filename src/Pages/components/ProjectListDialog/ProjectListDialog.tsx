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
import { ProjectResponseDto } from 'clients/CoreService';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpsertProjectDialog from '../UpsertProjectDialog';

const projects: ProjectResponseDto[] = [
	{
		ProjectId: 1,
		ProjectName: 'aasa',
		BeginDate: Date.now().toString(),
		EndDate: new Date().toString(),
		Owner: {
			UserId: 1,
			FirstName: 'Max',
			LastName: 'Maxim',
			Login: 'mm',
		},
	},
	{
		ProjectId: 2,
		ProjectName: 'basa',
		BeginDate: Date.now().toString(),
		EndDate: new Date().toString(),
		Owner: {
			UserId: 1,
			FirstName: 'Max',
			LastName: 'Maxim',
			Login: 'mm',
		},
	},
	{
		ProjectId: 3,
		ProjectName: 'casa',
		BeginDate: Date.now().toString(),
		EndDate: new Date().toString(),
		Owner: {
			UserId: 1,
			FirstName: 'Max',
			LastName: 'Maxim',
			Login: 'mm',
		},
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
			<DialogTitle>Projects</DialogTitle>
			<List sx={{ pt: 0 }}>
				{projects.map(project => (
					<ListItem
						button
						onClick={() => handleListItemClick(project.ProjectName)}
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
								console.log(project.ProjectId);
							}}
						>
							<DeleteIcon />
						</IconButton>
						<UpsertProjectDialog isNew={false}></UpsertProjectDialog>
					</ListItem>
				))}
				<UpsertProjectDialog isNew={true}></UpsertProjectDialog>
			</List>
		</Dialog>
	);
}

export default function ProjectListDialog() {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(projects[1].ProjectName);

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
				Project: {selectedValue}
			</Typography>
			<Button variant='outlined' onClick={handleClickOpen} sx={{ maxHeight: 20 }}>
				Manage projects
			</Button>
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
		</Box>
	);
}
