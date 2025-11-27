import { Injectable, NotFoundException } from '@nestjs/common';
import { Task,  TaskStatus } from './tasks.model';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const id = uuidv4();
    const { title, description } = createTaskDto;
    const task: Task = {
      id,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id); // уже бросит ошибку, если нет
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const task = this.getTaskById(id); // уже бросит ошибку, если нет
    this.tasks = this.tasks.filter((taskItem) => taskItem.id !== task.id);
  }
}
