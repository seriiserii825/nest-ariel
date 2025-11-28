import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import {FilterTaskDto} from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async filterTasks(filter_task_dto: FilterTaskDto): Promise<TaskEntity[]> {
    const { status, search } = filter_task_dto;
    const tasks = this.taskRepository.createQueryBuilder('task');
    if (status) {
      tasks.andWhere('task.status = :status', { status });
    }
    if (search) {
      tasks.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const result = await tasks.getMany();
    return result;
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });
    console.log('task', task);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

 async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id); // уже бросит ошибку, если нет
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id); // уже бросит ошибку, если нет
    await this.taskRepository.remove(task);
  }
}
