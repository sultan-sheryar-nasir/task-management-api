import { Controller, Get, Post, Body, Param, Put, Delete, ParseFloatPipe, Query, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';


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
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get('nearby')
  async findTasksNearby(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('radius', ParseFloatPipe) radius: number,): Promise<Task[]> {
    return this.taskService.findTasksNearby(latitude, longitude, radius);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.findById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(+id, updateTaskDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(+id);
  }
}
