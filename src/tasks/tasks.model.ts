export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export const TASK_STATUSES = ['OPEN', 'IN_PROGRESS', 'DONE'] as const;
export type TaskStatus = typeof TASK_STATUSES[number];
