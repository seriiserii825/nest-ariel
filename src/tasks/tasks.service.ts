import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import {TaskEntity} from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // filterTasks(filter_task_dto: FilterTaskDto): Task[] {
  //   const { status, search } = filter_task_dto;
  //   const tasks = this.getAllTasks();
  //   console.log('Filtering tasks with status:', status, 'and search:', search);
  //   if (status) {
  //     const status_tasks = tasks.filter((task) => task.status == status);
  //     console.log(JSON.stringify(tasks, null, 4));
  //     console.log('status_tasks', status_tasks);
  //     return status_tasks;
  //   }
  //   if (search) {
  //     return tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return task;
  // }
  //
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id); // уже бросит ошибку, если нет
  //   task.status = status;
  //   console.log(task, 'task');
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const task = this.getTaskById(id); // уже бросит ошибку, если нет
  //   this.tasks = this.tasks.filter((taskItem) => taskItem.id !== task.id);
  // }
}
