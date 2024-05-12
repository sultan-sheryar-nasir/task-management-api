import { Controller, Get, Post, Body, Param, Put, Delete, ParseFloatPipe, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../utils/constants';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async findAll(@Query('isCompleted') isCompleted?: boolean): Promise<Task[]> {
    if (isCompleted !== undefined) {
      return this.taskService.findAllTasksByCompletedStatus(isCompleted);
    } else {
      return this.taskService.findAll();
    }
  }

  @Post()
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.create(taskData);
  }

  @Get('nearby')
  async findTasksNearby(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('radius', ParseFloatPipe) radius: number,): Promise<Task[]> {
    return this.taskService.findTasksNearby(latitude, longitude, radius);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.update(+id, taskData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(+id);
  }
}
