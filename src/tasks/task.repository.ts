import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = new TaskEntity();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;
    try {
      await task.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Task with this title already exists');
      }
    }
    return task;
  }
}
