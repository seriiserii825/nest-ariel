import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import TaskEntity from './task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSourceOptions: DataSource) {
    super(TaskEntity, dataSourceOptions.createEntityManager());
  }
}
