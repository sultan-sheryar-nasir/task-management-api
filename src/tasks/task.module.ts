import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
  JwtModule.register({})],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
