import React from "react";
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { TaskContainer } from "./Task.styles";
import { TaskResponseDto } from "../../../clients/CoreService";
import { getDateWithTimeZone } from "shared/utils/util";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionIcon from '@mui/icons-material/Description';

export interface TaskProps {
	taskDto: TaskResponseDto;
}

export enum Status {
  "Not Started",
  "In Progress",
  "Finished"
}

function Task({taskDto}: TaskProps) {
	return (
		<TaskContainer>
      <Card sx={{ minWidth: 210, maxWidth: 280 }}>
      <CardContent>
        <Button variant="contained" disabled>
          {Status[taskDto.Status]}
        </Button>
        <Typography variant="h5" component="div">
					{taskDto.TaskName}
        </Typography>
        {taskDto.StartDate && 
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Start: {getDateWithTimeZone(taskDto.StartDate)}
        </Typography>}
        {taskDto.EndDate && 
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Deadline: {getDateWithTimeZone(taskDto.EndDate)}
        </Typography>}

        <Stack direction="row" alignItems="center" gap={1}>
          <DescriptionIcon/>
          <Typography variant="body2">Description:{taskDto.Description + "a".repeat(100)}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <PersonOutlineIcon/>
          <Typography variant="body1">Executor: {taskDto.Executor.Login}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
		</TaskContainer>
	);
}

export default Task;