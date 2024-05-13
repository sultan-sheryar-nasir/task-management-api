import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
// Need to add exception handling
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    try {
      return this.taskRepository.find();
    } catch (error) {
    }
  }

  async findAllTasksByCompletedStatus(isCompleted: boolean): Promise<Task[]> {
    return this.taskRepository.find({ where: { isCompleted } });
  }

  async create(taskData: CreateTaskDto): Promise<Task> {
    const { description, location } = taskData;
    const task = new Task();
    task.description = description;
    task.location = { type: 'Point', coordinates: location.coordinates };
    task.isCompleted = false;
    return this.taskRepository.save(task);
  }

  async findById(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    let data = await this.taskRepository.findOne({ where: { id } });
    if(!data){
      throw new HttpException(`No task found against taskID: ${id}`, HttpStatus.NOT_FOUND)
    }
    return data;
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
