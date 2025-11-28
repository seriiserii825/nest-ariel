import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import TaskEntity from './task.entity';

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
  async getTaskById(@Param('id') id: number): Promise<TaskEntity> {
    return await this.tasksService.getTaskById(id);
  }
  //
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
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
