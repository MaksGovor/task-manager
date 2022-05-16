import React, { useMemo } from 'react';
import { MainPageContainer } from './MainPage.styles';
import { ProjectsService, TasksService, UsersService } from '../clients/CoreService';
import Desk from './components/Desk/Desk';
import Header from './components/Header';
import { useQuery, useQueryClient } from 'react-query';
import { projectEntity, taskEntity, userEntity } from 'shared/utils/entity';
import { LinearProgress } from '@mui/material';
import { groupBy } from 'shared/utils/util';

function MainPage() {
	const queryClient = useQueryClient();
	const { data: existingTasks, isLoading: isTasksLoading } = useQuery(
		[taskEntity],
		() => TasksService.tasksGet(2),
		{
			onError: console.log,
		},
	);

	const { data: existingUsers, isLoading: isUsersLoading } = useQuery(
		[userEntity],
		() => UsersService.usersGet(),
		{
			onError: console.log,
		},
	);

	const { data: existingProjects, isLoading: isProjectsLoading } = useQuery(
		[projectEntity],
		() => ProjectsService.projectsGet(),
		{
			onError: console.log,
		},
	);

	const isLoading = useMemo(
		() => isProjectsLoading || isUsersLoading || isTasksLoading,
		[isProjectsLoading, isUsersLoading, isTasksLoading],
	);

	console.log({ existingProjects, existingUsers, isLoading });

	return (
		<>
			{!isLoading && <Header users={existingUsers} projects={existingProjects} />}
			<MainPageContainer>
				{isLoading && <LinearProgress />}
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
