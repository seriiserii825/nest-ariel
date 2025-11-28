import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  filterTasks(filter_task_dto: FilterTaskDto): Task[] {
    const { status, search } = filter_task_dto;
    const tasks = this.getAllTasks();
    console.log('Filtering tasks with status:', status, 'and search:', search);
    if (status) {
      const status_tasks = tasks.filter((task) => task.status == status);
      console.log(JSON.stringify(tasks, null, 4));
      console.log('status_tasks', status_tasks);
      return status_tasks;
    }
    if (search) {
      return tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
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
    console.log(task, 'task');
    return task;
  }

  deleteTask(id: string): void {
    const task = this.getTaskById(id); // уже бросит ошибку, если нет
    this.tasks = this.tasks.filter((taskItem) => taskItem.id !== task.id);
  }
}
