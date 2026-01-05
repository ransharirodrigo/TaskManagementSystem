export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS', 
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus | keyof typeof TaskStatus;
  createdAt: string | Date;
  updatedAt?: string | Date;
  dueDate?: string | Date;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
