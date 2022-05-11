/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TaskRequestDto = {
    TaskName: string;
    Description?: string;
    Priority: number;
    Status: 0 | 1 | 2;
    StartDate?: string;
    EndDate?: string;
    ProjectId: number;
    ExecutorId: number;
};