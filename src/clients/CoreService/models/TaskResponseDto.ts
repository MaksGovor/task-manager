/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProjectResponseDto } from './ProjectResponseDto';
import type { UserResponseDto } from './UserResponseDto';

export type TaskResponseDto = {
    TaskId: number;
    TaskName: string;
    Description?: string;
    Priority: number;
    Status: 0 | 1 | 2;
    StartDate?: string;
    EndDate?: string;
    Project: ProjectResponseDto;
    Executor: UserResponseDto;
};