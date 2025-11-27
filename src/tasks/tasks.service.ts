import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: string[] = ['first', 'second', 'third'];
  getAllTasks(): string[] {
    return this.tasks;
  }
}
