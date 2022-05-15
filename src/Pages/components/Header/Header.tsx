import React from 'react';
import {
	Box,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import { HeaderContainer } from './Header.styles';
import { ProjectResponseDto } from 'clients/CoreService';
import DeleteIcon from '@mui/icons-material/Delete';

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

function Header() {
	const [project, setProject] = React.useState(`${projects[0].ProjectId}`);

	const handleChange = (event: SelectChangeEvent) => {
		setProject(event.target.value as string);
	};

	return (
		<HeaderContainer>
			<Typography
				variant='h3'
				color={'#5b00a1'}
				sx={{ fontStyle: 'italic', fontFamily: 'cursive' }}
			>
				MG Task Manager
			</Typography>
			<div></div>
		</HeaderContainer>
	);
}

export default Header;
