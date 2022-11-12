import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Task from '../Task';
import { ProjectResponseDto, TaskResponseDto, UserResponseDto } from 'clients/CoreService';
import { Droppable } from 'react-beautiful-dnd';

export interface DeskSectionPropTypes {
	tasks: TaskResponseDto[];
	status: string;
	index: number;
	users: UserResponseDto[];
	projects: ProjectResponseDto[];
}

function DeskSection({ tasks, status, users, projects }: DeskSectionPropTypes) {
	return (
		<Droppable droppableId={status} type='TASK'>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<Box>
						<Typography variant='h4' color={'#5b00a1'}>
							{status}
						</Typography>
						<div>
							<Paper
								style={{
									maxHeight: '80vh',
									height: '80vh',
									minWidth: '320px',
									overflow: 'auto',
									background: '#b3d0ff',
								}}
							>
								{tasks &&
									tasks.map((taskDto, index) => (
										<Task
											taskDto={taskDto}
											key={taskDto.TaskId}
											index={index}
											users={users}
											projects={projects}
										></Task>
									))}
							</Paper>
						</div>
					</Box>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}

export default DeskSection;
