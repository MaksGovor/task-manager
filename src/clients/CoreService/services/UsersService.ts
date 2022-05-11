/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRequestDto } from '../models/UserRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns any Sucessfuly returns list of users
     * @throws ApiError
     */
    public static usersGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users',
        });
    }

    /**
     * @param userDto 
     * @returns any Sucessfuly creates user
     * @throws ApiError
     */
    public static usersPost(
userDto: UserRequestDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users',
            body: userDto,
            errors: {
                400: `Invalid input`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param id 
     * @returns any Sucessfuly returns user with id
     * @throws ApiError
     */
    public static usersGet1(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `There is no users with such id`,
            },
        });
    }

    /**
     * @param id 
     * @returns any Sucessfuly deleted
     * @throws ApiError
     */
    public static usersDelete(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid id`,
            },
        });
    }

}