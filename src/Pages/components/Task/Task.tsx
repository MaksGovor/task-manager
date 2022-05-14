import React from "react";
import { Button, Card, CardActions, CardContent, Divider, IconButton, Stack, Typography } from "@mui/material";
import { CenteredBox, TaskContainer } from "./Task.styles";
import { TaskResponseDto } from "../../../clients/CoreService";
import { getDateWithTimeZone } from "shared/utils/util";
import UpsertTaskDialog from "../UpsertTaskDialog";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Card sx={{ minWidth: 240, maxWidth: 310 }}>
      <CardContent sx={{ mb: 0}}>
        <CenteredBox>
          <Button variant="contained" disabled>
            {Status[taskDto.Status]}
          </Button>
        </CenteredBox>
        <Divider/>
        <Stack direction="row" alignItems="center" gap={1} sx={{mb: 1.5}}>
          <TaskAltIcon/>
          <Typography variant="h5" component="div">{taskDto.TaskName}</Typography>
        </Stack>

        {taskDto.StartDate && 
          <Stack direction="row" alignItems="center" gap={1} sx={{mb: 1}}>
            <PlayCircleOutlineIcon/>
            <Typography color="text.secondary">
              Start: {getDateWithTimeZone(taskDto.StartDate)}
            </Typography>
          </Stack>
        }
        {taskDto.EndDate && 
          <Stack direction="row" alignItems="center" gap={1} sx={{mb: 1}}>
            <AlarmOnIcon/>
            <Typography color="text.secondary">
              Deadline: {getDateWithTimeZone(taskDto.EndDate)}
            </Typography>
          </Stack>
        }
        <Stack direction="row" alignItems="center" gap={1}>
          <DescriptionIcon/>
          <Typography variant="body2">Description: {taskDto.Description?.slice(0, 50)}...</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <PersonOutlineIcon/>
          <Typography variant="body1">Executor: {taskDto.Executor.Login}</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'flex-end', mt: 0}}>
        <UpsertTaskDialog taskDto={taskDto}></UpsertTaskDialog>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
		</TaskContainer>
	);
}

export default Task;