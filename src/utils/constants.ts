import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const QUERIES = {
    FIND_NEARBY_TASKS: `SELECT * FROM task
        WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, $3)`
}

export const ERRORS = {
    RETRIVE_TASK_FAILED: 'Failed to retrieve tasks',
    FAILED_TO_FIND_NEARBY_TASK: 'Failed to find nearby tasks'
}