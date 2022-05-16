import React from 'react';
import { Typography } from '@mui/material';
import { HeaderContainer, ManageContainer } from './Header.styles';
import UserListDialog from '../UserListDialog';
import ProjectListDialog from '../ProjectListDialog';
import UpsertTaskDialog from '../UpsertTaskDialog';

function Header() {
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
				<UpsertTaskDialog isNew={true}></UpsertTaskDialog>
				<UserListDialog></UserListDialog>
				<ProjectListDialog></ProjectListDialog>
			</ManageContainer>
		</HeaderContainer>
	);
}

export default Header;
