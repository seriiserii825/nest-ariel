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
import {TaskEntity} from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(@Query() filter_dto: FilterTaskDto): Task[] {
  //   if (Object.keys(filter_dto).length) {
  //     return this.tasksService.filterTasks(filter_dto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }
  //
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
  //
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
  //
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   this.tasksService.deleteTask(id);
  //   return `Task with ID "${id}" has been deleted`;
  // }
}
