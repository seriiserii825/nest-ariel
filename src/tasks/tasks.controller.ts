import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import {FilterTaskDto} from './dto/filter-tasks.dto';
import {TaskStatusValidationPipe} from 'src/pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Query() filter_dto: FilterTaskDto): Promise<TaskEntity[]> {
    if (Object.keys(filter_dto).length) {
      return this.tasksService.filterTasks(filter_dto);
    }
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskEntity> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.tasksService.createTask(createTaskDto);
    // return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return await this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.tasksService.deleteTask(id);
    return `Task with ID "${id}" has been deleted`;
  }
}
