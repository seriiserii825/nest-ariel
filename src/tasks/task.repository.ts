import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = new TaskEntity();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
