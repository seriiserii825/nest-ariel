import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const id = uuidv4();
    const task: Task = {
      id,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
