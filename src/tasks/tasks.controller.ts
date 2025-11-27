import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/:status/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Param('status') status: string,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status as TaskStatus);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    this.tasksService.deleteTask(id);
    return `Task with ID "${id}" has been deleted`;
  }
}
