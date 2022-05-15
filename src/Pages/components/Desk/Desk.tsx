import React from 'react';
import { Box } from '@mui/system';
import { TaskResponseDto } from 'clients/CoreService';
import DeskSection from '../DeskSection';
import { DeskContainer } from './Desk.styles';
import { Status } from '../Task/Task';

export interface DeskPropTypes {
	tasks: TaskResponseDto[];
}

function Desk({ tasks }: DeskPropTypes) {
	return (
		<DeskContainer>
			<Box>
				<DeskSection tasks={tasks} status={Status[0]}></DeskSection>
			</Box>
			<Box>
				<DeskSection tasks={[]} status={Status[1]}></DeskSection>
			</Box>
			<Box>
				<DeskSection tasks={tasks} status={Status[2]}></DeskSection>
			</Box>
		</DeskContainer>
	);
}

export default Desk;
