import React from 'react';
import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import Task from '../Task';
import { TaskResponseDto } from 'clients/CoreService';
import { Droppable, DraggableProvided } from 'react-beautiful-dnd';

export interface DeskSectionPropTypes {
	tasks: TaskResponseDto[];
	status: string;
	index: number;
}

function DeskSection({ tasks, status }: DeskSectionPropTypes) {
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
								{tasks.length >= 0 &&
									tasks.map((taskDto, index) => (
										<Task taskDto={taskDto} key={taskDto.TaskId} index={index}></Task>
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
