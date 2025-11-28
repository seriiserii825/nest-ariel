import { BadRequestException, PipeTransform } from '@nestjs/common';
import {TaskStatus} from 'src/tasks/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.values(TaskStatus);

  transform(value: unknown) {
    if (typeof value !== 'string' || !this.isStatusValid(value.toUpperCase())) {
      throw new BadRequestException(
        `Is an invalid status, use one of: ${this.allowedStatuses.join(', ')}`,
      );
    }
    return value.toUpperCase() as TaskStatus;
  }

  private isStatusValid(status: unknown): boolean {
    return this.allowedStatuses.includes(status as TaskStatus);
  }
}
