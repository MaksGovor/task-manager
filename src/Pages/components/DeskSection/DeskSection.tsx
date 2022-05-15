import React from 'react';
import { List, ListItem, Paper, Typography } from '@mui/material';
import Task from '../Task';
import { TaskResponseDto } from 'clients/CoreService';

export interface DeskSectionPropTypes {
	tasks: TaskResponseDto[];
	status: string;
}

function DeskSection({ tasks, status }: DeskSectionPropTypes) {
	return (
		<>
			<Typography variant='h4' color={'#5b00a1'}>
				{status}
			</Typography>
			<Paper
				style={{
					maxHeight: '80vh',
					height: '100%',
					minWidth: '320px',
					overflow: 'auto',
					background: '#b3d0ff',
				}}
			>
				<List>
					{tasks.length >= 0 &&
						tasks.map(taskDto => (
							<ListItem key={taskDto.TaskId}>
								<Task taskDto={taskDto}></Task>
							</ListItem>
						))}
				</List>
			</Paper>
		</>
	);
}

export default DeskSection;
