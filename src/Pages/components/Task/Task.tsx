import React from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	ListItem,
	Stack,
	Typography,
} from '@mui/material';
import { CenteredBox, TaskContainer } from './Task.styles';
import {
	ProjectResponseDto,
	TaskResponseDto,
	TasksService,
	UserResponseDto,
} from '../../../clients/CoreService';
import { getDateWithTimeZone } from 'shared/utils/util';
import UpsertTaskDialog from '../UpsertTaskDialog';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import DeleteIcon from '@mui/icons-material/Delete';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import {
	Draggable,
	DraggableStateSnapshot,
	DraggingStyle,
	NotDraggingStyle,
} from 'react-beautiful-dnd';
import { taskEntity } from 'shared/utils/entity';
import { useMutation, useQueryClient } from 'react-query';

export interface TaskProps {
	taskDto: TaskResponseDto;
	index: number;
	users: UserResponseDto[];
	projects: ProjectResponseDto[];
}

export enum Status {
	'Not Started',
	'In Progress',
	'Finished',
}

enum ColorStatus {
	'#c7d16f',
	'#42add4',
	'#42d48f',
}

function getStyle(
	style: DraggingStyle | NotDraggingStyle | undefined,
	snapshot: DraggableStateSnapshot,
) {
	if (!snapshot.isDropAnimating) {
		return style;
	}
	return {
		...style,
		// cannot be 0, but make it super tiny
		transition: 'all .5s cubic-bezier(.25,.8,.25,1)',
	};
}

function Task({ taskDto, index, users, projects }: TaskProps) {
	const queryClient = useQueryClient();

	const { mutate: deleteTask, isLoading: isDeleteLoading } = useMutation(
		[taskEntity],
		(id: number) => {
			return TasksService.tasksDelete(id);
		},
		{
			onError: console.log,
			onSettled: () => {
				queryClient.invalidateQueries(taskEntity);
			},
		},
	);

	return (
		<Draggable draggableId={taskDto.TaskId + ''} index={index}>
			{(provided, snapshot) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<ListItem>
						<TaskContainer>
							<Card sx={{ minWidth: 240, maxWidth: 310, cursor: 'pointer' }}>
								<CardContent sx={{ mb: 0 }}>
									<CenteredBox>
										<Button
											variant='contained'
											disabled
											style={{ backgroundColor: ColorStatus[taskDto.Status] }}
										>
											{Status[taskDto.Status]}
										</Button>
									</CenteredBox>
									<Divider sx={{ mb: 1 }} />
									<Stack direction='row' alignItems='center' gap={1} sx={{ mb: 1.5 }}>
										<TaskAltIcon />
										<Typography variant='h5' component='div'>
											{taskDto.TaskName}
										</Typography>
									</Stack>
									<Stack direction='row' alignItems='center' gap={1} sx={{ mb: 1.5 }}>
										<LowPriorityIcon />
										<Typography variant='body2' component='div'>
											Priority: {taskDto.Priority}
										</Typography>
									</Stack>
									{taskDto.StartDate && (
										<Stack direction='row' alignItems='center' gap={1} sx={{ mb: 1 }}>
											<PlayCircleOutlineIcon />
											<Typography color='text.secondary'>
												Start: {getDateWithTimeZone(taskDto.StartDate)}
											</Typography>
										</Stack>
									)}
									{taskDto.EndDate && (
										<Stack direction='row' alignItems='center' gap={1} sx={{ mb: 1 }}>
											<AlarmOnIcon />
											<Typography color='text.secondary'>
												Deadline: {getDateWithTimeZone(taskDto.EndDate)}
											</Typography>
										</Stack>
									)}
									<Stack direction='row' alignItems='center' gap={1}>
										<DescriptionIcon />
										<Typography variant='body2'>
											Description: {taskDto.Description?.slice(0, 50)}...
										</Typography>
									</Stack>
									<Stack direction='row' alignItems='center' gap={1}>
										<PersonOutlineIcon />
										<Typography variant='body1'>Executor: {taskDto.Executor.Login}</Typography>
									</Stack>
								</CardContent>
								<CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}>
									<UpsertTaskDialog
										taskDto={taskDto}
										isNew={false}
										users={users}
										projects={projects}
									/>
									<IconButton
										aria-label='delete'
										onClick={() => (taskDto.TaskId ? deleteTask(taskDto.TaskId) : 0)}
									>
										<DeleteIcon />
									</IconButton>
								</CardActions>
							</Card>
						</TaskContainer>
					</ListItem>
				</div>
			)}
		</Draggable>
	);
}

export default Task;
