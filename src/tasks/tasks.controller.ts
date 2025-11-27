import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type {Task} from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: { title: string; description: string }): Task {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description);
  }
}
