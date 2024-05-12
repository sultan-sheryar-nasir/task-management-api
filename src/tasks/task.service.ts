import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findAllTasksByCompletedStatus(isCompleted: boolean): Promise<Task[]> {
    return this.taskRepository.find({ where: { isCompleted } });
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  async findById(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, taskData);
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async findTasksNearby(latitude: number, longitude: number, radius: number): Promise<Task[]> {
    return this.taskRepository.query(`
      SELECT * FROM task
      WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, $3)
    `, [latitude, longitude, radius]);
  }
}
