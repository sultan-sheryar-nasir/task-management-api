import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../tasks/task.controller';
import { TaskService } from '../tasks/task.service';
import { Task } from '../tasks/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';

describe('TaskController', () => {
    let controller: TaskController;
    let taskService: TaskService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [TaskController],
        providers: [
          {
            provide: TaskService,
            useValue: {
              findAll: jest.fn(),
              findAllTasksByCompletedStatus: jest.fn(),
              create: jest.fn(),
              findById: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findTasksNearby: jest.fn(),
            },
          },
        ],
      }).compile();
  
      controller = module.get<TaskController>(TaskController);
      taskService = module.get<TaskService>(TaskService);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  
    describe('create', () => {
      it('should create a new task', async () => {
        const taskData: CreateTaskDto = { description: 'Task description', location: { type: 'Point', coordinates: [0, 0] } };
        const createdTask: Task = { id: 1, description: 'Task description', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } };
        jest.spyOn(taskService, 'create').mockResolvedValue(createdTask);
  
        const result = await controller.create(taskData);
  
        expect(result).toEqual(createdTask);
      });
    });
  
    describe('findAll', () => {
      it('should return all tasks', async () => {
        const tasks: Task[] = [
          { id: 1, description: 'Task 1', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } },
          { id: 2, description: 'Task 2', isCompleted: true, location: { type: 'Point', coordinates: [0, 0] } },
        ];
        jest.spyOn(taskService, 'findAll').mockResolvedValue(tasks);
  
        const result = await controller.findAll();
  
        expect(result).toEqual(tasks);
      });
  
      it('should return tasks filtered by isCompleted status', async () => {
        const tasks: Task[] = [
          { id: 1, description: 'Task 1', isCompleted: true, location: { type: 'Point', coordinates: [0, 0] } },
          { id: 2, description: 'Task 2', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } },
        ];
        jest.spyOn(taskService, 'findAllTasksByCompletedStatus').mockResolvedValue(tasks);
  
        const result = await controller.findAll(true);
  
        expect(result).toEqual(tasks);
      });
    });
  
    describe('findTasksNearby', () => {
      it('should return tasks nearby given coordinates and radius', async () => {
        const latitude = 40.7128;
        const longitude = -74.0060;
        const radius = 1000;
        const nearbyTasks: Task[] = [
          { id: 1, description: 'Nearby Task 1', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } },
          { id: 2, description: 'Nearby Task 2', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } },
        ];
        jest.spyOn(taskService, 'findTasksNearby').mockResolvedValue(nearbyTasks);
  
        const result = await controller.findTasksNearby(latitude, longitude, radius);
  
        expect(result).toEqual(nearbyTasks);
      });
    });
  
    describe('findOne', () => {
      it('should return the task with the specified ID', async () => {
        const taskId = 1;
        const task: Task = { id: 1, description: 'Task 1', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } };
        jest.spyOn(taskService, 'findById').mockResolvedValue(task);
  
        const result = await controller.findOne(taskId);
  
        expect(result).toEqual(task);
      });
  
      it('should return null if task with the specified ID does not exist', async () => {
        const taskId = 999; // Non-existent ID
        jest.spyOn(taskService, 'findById').mockResolvedValue(null);
  
        const result = await controller.findOne(taskId);
  
        expect(result).toBeNull();
      });
    });
  
    describe('update', () => {
        it('should update the task with the specified ID', async () => {
          const taskId = 1;
          const updatedTaskData: UpdateTaskDto = { description: 'Updated Task Description' };
          const updatedTask: Task = { id: 1, description: 'Updated Task Description', isCompleted: false, location: { type: 'Point', coordinates: [0, 0] } };
          jest.spyOn(taskService, 'update').mockResolvedValue(updatedTask);
      
          const result = await controller.update(taskId, updatedTaskData);
      
          expect(result).toEqual(updatedTask);
        });
      
        it('should return null if task with the specified ID does not exist', async () => {
          const taskId = 999; // Non-existent ID
          const updatedTaskData: Partial<Task> = { description: 'Updated Task Description' };
          jest.spyOn(taskService, 'update').mockResolvedValue(null);
      
          const result = await controller.update(taskId, updatedTaskData);
      
          expect(result).toBeNull();
        });
      });
      
      describe('remove', () => {
        it('should delete the task with the specified ID', async () => {
          const taskId = 1;
          jest.spyOn(taskService, 'delete').mockResolvedValue(undefined);
      
          const result = await controller.remove(taskId);
      
          expect(result).toBeUndefined();
        });
      
        it('should return null if task with the specified ID does not exist', async () => {
          const taskId = 999; // Non-existent ID
          jest.spyOn(taskService, 'delete').mockResolvedValue(undefined);
      
          const result = await controller.remove(taskId);
      
          expect(result).toBeUndefined();
        });
      });
      
  });