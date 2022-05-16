import React, { useState } from 'react';
import { MainPageContainer } from './MainPage.styles';
import { TaskResponseDto } from '../clients/CoreService';
import Desk from './components/Desk/Desk';
import Header from './components/Header';

const taskDto: TaskResponseDto[][] = [
	[
		{
			TaskId: 1,
			TaskName: 'Example1',
			Description: 'Some',
			Priority: 1,
			Status: 0,
			StartDate: new Date().toString(),
			EndDate: new Date().toString(),
			Project: {
				ProjectId: 1,
				ProjectName: 'asa',
				BeginDate: Date.now().toString(),
				EndDate: new Date().toString(),
				Owner: {
					UserId: 1,
					FirstName: 'Max',
					LastName: 'Maxim',
					Login: 'mm',
				},
			},
			Executor: {
				UserId: 1,
				FirstName: 'Max',
				LastName: 'Maxim',
				Login: 'mm',
			},
		},
		{
			TaskId: 2,
			TaskName: 'Example2',
			Description: 'Some',
			Priority: 1,
			Status: 0,
			StartDate: new Date().toString(),
			EndDate: new Date().toString(),
			Project: {
				ProjectId: 1,
				ProjectName: 'asa',
				BeginDate: Date.now().toString(),
				EndDate: new Date().toString(),
				Owner: {
					UserId: 1,
					FirstName: 'Max',
					LastName: 'Maxim',
					Login: 'mm',
				},
			},
			Executor: {
				UserId: 1,
				FirstName: 'Max',
				LastName: 'Maxim',
				Login: 'mm',
			},
		},
	],
	[
		{
			TaskId: 3,
			TaskName: 'Example3',
			Description: 'Some',
			Priority: 1,
			Status: 0,
			StartDate: new Date().toString(),
			EndDate: new Date().toString(),
			Project: {
				ProjectId: 1,
				ProjectName: 'asa',
				BeginDate: Date.now().toString(),
				EndDate: new Date().toString(),
				Owner: {
					UserId: 1,
					FirstName: 'Max',
					LastName: 'Maxim',
					Login: 'mm',
				},
			},
			Executor: {
				UserId: 1,
				FirstName: 'Max',
				LastName: 'Maxim',
				Login: 'mm',
			},
		},
		{
			TaskId: 4,
			TaskName: 'Example4',
			Description: 'Some',
			Priority: 1,
			Status: 0,
			StartDate: new Date().toString(),
			EndDate: new Date().toString(),
			Project: {
				ProjectId: 1,
				ProjectName: 'asa',
				BeginDate: Date.now().toString(),
				EndDate: new Date().toString(),
				Owner: {
					UserId: 1,
					FirstName: 'Max',
					LastName: 'Maxim',
					Login: 'mm',
				},
			},
			Executor: {
				UserId: 1,
				FirstName: 'Max',
				LastName: 'Maxim',
				Login: 'mm',
			},
		},
	],
	[
		{
			TaskId: 5,
			TaskName: 'Example5',
			Description: 'Some',
			Priority: 1,
			Status: 0,
			StartDate: new Date().toString(),
			EndDate: new Date().toString(),
			Project: {
				ProjectId: 1,
				ProjectName: 'asa',
				BeginDate: Date.now().toString(),
				EndDate: new Date().toString(),
				Owner: {
					UserId: 1,
					FirstName: 'Max',
					LastName: 'Maxim',
					Login: 'mm',
				},
			},
			Executor: {
				UserId: 1,
				FirstName: 'Max',
				LastName: 'Maxim',
				Login: 'mm',
			},
		},
		{
			TaskId: 6,
			TaskName: 'Example6',
			Description: 'Some',
			Priority: 1,
			Status: 0,
			StartDate: new Date().toString(),
			EndDate: new Date().toString(),
			Project: {
				ProjectId: 1,
				ProjectName: 'asa',
				BeginDate: Date.now().toString(),
				EndDate: new Date().toString(),
				Owner: {
					UserId: 1,
					FirstName: 'Max',
					LastName: 'Maxim',
					Login: 'mm',
				},
			},
			Executor: {
				UserId: 1,
				FirstName: 'Max',
				LastName: 'Maxim',
				Login: 'mm',
			},
		},
	],
];

function MainPage() {
	const [tasks, setTasks] = useState<TaskResponseDto[][]>(taskDto);

	return (
		<>
			<Header></Header>
			<MainPageContainer>
				<Desk tasks={tasks}></Desk>
			</MainPageContainer>
		</>
	);
}

export default MainPage;
