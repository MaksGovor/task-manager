import React from 'react';
import { MainPageContainer } from './MainPage.styles';
import { TaskResponseDto } from '../clients/CoreService';
import Desk from './components/Desk/Desk';
import Header from './components/Header';

const taskDto: TaskResponseDto[] = [
	{
		TaskId: 1,
		TaskName: 'Example',
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
		TaskId: 1,
		TaskName: 'Example',
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
		TaskId: 1,
		TaskName: 'Example',
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
		TaskId: 1,
		TaskName: 'Example',
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
		TaskId: 1,
		TaskName: 'Example',
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
		TaskId: 1,
		TaskName: 'Example',
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
];

function MainPage() {
	return (
		<>
			<Header></Header>
			<MainPageContainer>
				<Desk tasks={taskDto}></Desk>
			</MainPageContainer>
		</>
	);
}

export default MainPage;
