/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectRequestDto } from '../models/ProjectRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * @returns any Sucessfuly returns list of projects
     * @throws ApiError
     */
    public static projectsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Projects',
        });
    }

    /**
     * @param projectDto 
     * @returns any Sucessfuly creates project
     * @throws ApiError
     */
    public static projectsPost(
projectDto: ProjectRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Projects',
            body: projectDto,
            errors: {
                400: `Invalid input`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param id 
     * @returns any Sucessfuly returns project with id
     * @throws ApiError
     */
    public static projectsGet1(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Projects/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `There is no projects with such id`,
            },
        });
    }

    /**
     * @param id 
     * @param projectDto 
     * @returns any Sucessfuly updated
     * @throws ApiError
     */
    public static projectsPut(
id: number,
projectDto: ProjectRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Projects/{id}',
            path: {
                'id': id,
            },
            body: projectDto,
            errors: {
                400: `Invalid id`,
            },
        });
    }

    /**
     * @param id 
     * @returns any Sucessfuly deleted
     * @throws ApiError
     */
    public static projectsDelete(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Projects/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid id`,
            },
        });
    }

}