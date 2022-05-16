import React from 'react';
import { Box } from '@mui/system';
import { ProjectResponseDto, TaskResponseDto, UserResponseDto } from 'clients/CoreService';
import DeskSection from '../DeskSection';
import { DeskContainer } from './Desk.styles';
import { Status } from '../Task/Task';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

export interface DeskPropTypes {
	tasks: TaskResponseDto[][];
	users: UserResponseDto[];
	projects: ProjectResponseDto[];
}

export const statuses = Object.freeze([0, 1, 2]);

function Desk({ tasks, users, projects }: DeskPropTypes) {
	const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
		console.log(result);

		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}
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
