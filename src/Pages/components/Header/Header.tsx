import React from 'react';
import { Typography } from '@mui/material';
import { HeaderContainer, ManageContainer } from './Header.styles';
import UserListDialog from '../UserListDialog';
import ProjectListDialog from '../ProjectListDialog';
import UpsertTaskDialog from '../UpsertTaskDialog';
import { ProjectResponseDto, UserResponseDto } from 'clients/CoreService';

export interface HeaderProps {
	users: UserResponseDto[];
	projects: ProjectResponseDto[];
}

function Header({ users, projects }: HeaderProps) {
	return (
		<HeaderContainer>
			<Typography
				variant='h3'
				color={'#5b00a1'}
				sx={{ fontStyle: 'italic', fontFamily: 'cursive' }}
			>
				MG Task Manager
			</Typography>
			<ManageContainer>
				<UpsertTaskDialog isNew={true} users={users} projects={projects}></UpsertTaskDialog>
				<UserListDialog users={users}></UserListDialog>
				<ProjectListDialog projects={projects} users={users}></ProjectListDialog>
			</ManageContainer>
		</HeaderContainer>
	);
}

export default Header;
