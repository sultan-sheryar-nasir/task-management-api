import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class TaskCreationFailedException extends HttpException {
  constructor(message: string) {
    super(`Failed to create task: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class TaskUpdateFailedException extends HttpException {
  constructor(message: string) {
    super(`Failed to update task: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class TaskDeletionFailedException extends HttpException {
  constructor(message: string) {
    super(`Failed to delete task: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}