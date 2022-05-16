import React from 'react';
import { Box } from '@mui/system';
import {
	ProjectResponseDto,
	TaskRequestDto,
	TaskResponseDto,
	TasksService,
	UserResponseDto,
} from 'clients/CoreService';
import DeskSection from '../DeskSection';
import { DeskContainer } from './Desk.styles';
import { Status } from '../Task/Task';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from 'react-query';
import { taskEntity } from 'shared/utils/entity';
import { getStatus } from 'shared/utils/util';

export interface DeskPropTypes {
	tasks: TaskResponseDto[][];
	users: UserResponseDto[];
	projects: ProjectResponseDto[];
}

export const statuses = Object.freeze([0, 1, 2]);

interface UpdateStatusArgs {
	status: 0 | 1 | 2;
	id: number;
}

function Desk({ tasks, users, projects }: DeskPropTypes) {
	const queryClient = useQueryClient();

	const { mutate: updateStatusTask, isLoading: isUpdateLoading } = useMutation(
		[taskEntity],
		(args: UpdateStatusArgs) => {
			return TasksService.tasksPut(args.id, args.status);
		},
		{
			onError: console.log,
			onSettled: () => {
				queryClient.invalidateQueries(taskEntity);
			},
		},
	);

	const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
		if (!result.destination || !result.draggableId) {
			return;
		}

		const statusName: string = result.destination.droppableId.toString();
		setTimeout(
			() => updateStatusTask({ status: getStatus(statusName), id: +result.draggableId }),
			0,
		);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<DeskContainer>
				{statuses.map((id, index) => (
					<DeskSection
						key={id}
						tasks={tasks[index]}
						status={Status[id]}
						index={index}
						users={users}
						projects={projects}
					></DeskSection>
				))}
			</DeskContainer>
		</DragDropContext>
	);
}

export default Desk;
