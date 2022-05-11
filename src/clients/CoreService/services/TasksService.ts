/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskRequestDto } from '../models/TaskRequestDto';
import type { TaskResponseDto } from '../models/TaskResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TasksService {

    /**
     * @param projectId 
     * @returns any Sucessfuly returns list of tasks for project
     * @throws ApiError
     */
    public static tasksGet(
projectId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Tasks/AllForProject',
            query: {
                'projectId': projectId,
            },
            errors: {
                400: `Invalid projectId`,
            },
        });
    }

    /**
     * @param projectId 
     * @param userId 
     * @returns any Sucessfuly returns list of tasks for user in project
     * @throws ApiError
     */
    public static tasksGet1(
projectId: number,
userId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Tasks/AllForUser',
            query: {
                'projectId': projectId,
                'userId': userId,
            },
            errors: {
                400: `Invalid projectId`,
            },
        });
    }

    /**
     * @param id 
     * @param status 
     * @returns TaskResponseDto OK
     * @returns any Sucessfuly updates task
     * @throws ApiError
     */
    public static tasksPut(
id: number,
status: 0 | 1 | 2,
): CancelablePromise<TaskResponseDto | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Tasks/UdateStatus',
            query: {
                'id': id,
            },
            body: status,
            errors: {
                400: `Invalid input`,
            },
        });
    }

    /**
     * @param taskDto 
     * @returns any Sucessfuly creates task
     * @throws ApiError
     */
    public static tasksPost(
taskDto: TaskRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Tasks',
            body: taskDto,
            errors: {
                400: `Invalid input`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param id 
     * @param taskDto 
     * @returns TaskResponseDto OK
     * @returns any Sucessfuly updates task
     * @throws ApiError
     */
    public static tasksPut1(
id: number,
taskDto: TaskRequestDto,
): CancelablePromise<TaskResponseDto | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Tasks/{id}',
            path: {
                'id': id,
            },
            body: taskDto,
            errors: {
                400: `Invalid input`,
            },
        });
    }

    /**
     * @param id 
     * @returns any Sucessfuly deleted
     * @throws ApiError
     */
    public static tasksDelete(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid id`,
                500: `Internal server error`,
            },
        });
    }

}