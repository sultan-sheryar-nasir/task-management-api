import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { TaskCreationFailedException, TaskDeletionFailedException, TaskNotFoundException, TaskUpdateFailedException } from '../utils/custom.exception';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new HttpException('Failed to retrieve tasks', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllTasksByCompletedStatus(isCompleted: boolean): Promise<Task[]> {
    try {
      return await this.taskRepository.find({ where: { isCompleted } });
    } catch (error) {
      throw new HttpException('Failed to retrieve tasks', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async create(taskData: CreateTaskDto): Promise<Task> {
    try {
      const { description, location } = taskData;
      const task = new Task();
      task.description = description;
      task.location = { type: 'Point', coordinates: location.coordinates };
      task.isCompleted = false;
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new TaskCreationFailedException(error.message);
    }
  }

  async findById(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) {
        throw new TaskNotFoundException(id);
      }
      return task;
    } catch (error) {
      if (error instanceof TaskNotFoundException) {
        throw error
      }
      throw new HttpException('Failed to retrieve task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      await this.taskRepository.update(id, updateTaskDto);
      const updatedTask = await this.taskRepository.findOne({ where: { id } });
      if (!updatedTask) {
        throw new TaskNotFoundException(id);
      }
      return updatedTask;
    } catch (error) {
      if (error instanceof TaskNotFoundException) {
        throw error
      }
      throw new TaskUpdateFailedException(error.message);
    }
  }


  async delete(id: number): Promise<void> {
    try {
      const result = await this.taskRepository.delete(id);
      if (result.affected === 0) {
        throw new TaskNotFoundException(id);
      }
    } catch (error) {
      if (error instanceof TaskNotFoundException) {
        throw error
      }
      throw new TaskDeletionFailedException(error.message);
    }
  }

  async findTasksNearby(latitude: number, longitude: number, radius: number): Promise<Task[]> {
    try {
      return this.taskRepository.query(`
        SELECT * FROM task
        WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, $3)
      `, [latitude, longitude, radius]);
    } catch (error) {
      throw new HttpException('Failed to find nearby tasks', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
