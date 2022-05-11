/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserResponseDto } from './UserResponseDto';

export type ProjectResponseDto = {
    ProjectId?: number;
    ProjectName: string;
    BeginDate?: string;
    EndDate?: string;
    Owner: UserResponseDto;
};