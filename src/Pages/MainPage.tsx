import React from 'react';
import { MainPageContainer } from "./MainPage.styles";
import Task from './components/Task'
import { TaskResponseDto } from "../clients/CoreService";

const taskDto: TaskResponseDto = {
	TaskId: 1,
	TaskName: "Example",
  Description: "Some",
  Priority: 1,
  Status: 0,
  StartDate: new Date().toUTCString(),
  EndDate: new Date().toUTCString(),
  Project: {
    ProjectId: 1,
    ProjectName: "asa",
    BeginDate: new Date().toUTCString(),
    EndDate: new Date().toUTCString(),
    Owner: {
      UserId: 1,
      FirstName: "Max",
      LastName: "Maxim",
      Login: "mm",
    }
  },
  Executor: {
    UserId: 1,
    FirstName: "Max",
    LastName: "Maxim",
    Login: "mm",
  },
}

function MainPage() {
	return (
		<>
    <MainPageContainer>
      <Task taskDto={taskDto}></Task>
      <Task taskDto={taskDto}></Task>
    </MainPageContainer>
		</>
	);
}

export default MainPage;