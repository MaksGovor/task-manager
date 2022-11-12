import React, { useEffect, useMemo, useState } from 'react';
import { MainPageContainer } from './MainPage.styles';
import { ProjectsService, TasksService, UsersService } from '../clients/CoreService';
import Desk from './components/Desk/Desk';
import Header from './components/Header';
import { useQuery, useQueryClient } from 'react-query';
import { projectEntity, taskEntity, userEntity } from 'shared/utils/entity';
import { LinearProgress, Typography } from '@mui/material';
import { groupBy } from 'shared/utils/util';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';

function MainPage() {
	const queryClient = useQueryClient();
	const [currentProject, setCurrentProject] = useState<number>();

	const { data: existingTasks, isLoading: isTasksLoading } = useQuery(
		[taskEntity, currentProject],
		() => (currentProject ? TasksService.tasksGet(currentProject) : 0),
		{
			onError: useSnackbarOnError(),
			enabled: !!currentProject,
		},
	);

	const { data: existingUsers, isLoading: isUsersLoading } = useQuery(
		[userEntity],
		() => UsersService.usersGet(),
		{
			onError: useSnackbarOnError(),
		},
	);

	const { data: existingProjects, isLoading: isProjectsLoading } = useQuery(
		[projectEntity],
		() => ProjectsService.projectsGet(),
		{
			onError: useSnackbarOnError(),
		},
	);

	const isLoading = useMemo(
		() => isProjectsLoading || isUsersLoading || isTasksLoading,
		[isProjectsLoading, isUsersLoading, isTasksLoading],
	);

	useEffect(() => {
		queryClient.invalidateQueries(taskEntity);
	}, [currentProject]);

	return (
		<>
			{!isLoading && (
				<Header
					users={existingUsers}
					projects={existingProjects}
					setCurrentProject={setCurrentProject}
				/>
			)}
			<MainPageContainer>
				{isLoading && <LinearProgress />}
				{!isLoading && (!existingProjects.length || !existingUsers.length) && (
					<>
						<Typography variant='h3' color={'#5b00a1'}>
							For start you may register at least one user and create first project
						</Typography>
					</>
				)}
				{existingTasks && (
					<Desk
						tasks={groupBy(existingTasks, 'Status')}
						users={existingUsers}
						projects={existingProjects}
					></Desk>
				)}
			</MainPageContainer>
		</>
	);
}

export default MainPage;
