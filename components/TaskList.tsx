/**
 * Task List Component
 * Displays a grid of task cards with loading and empty states
 */

'use client';

import { Task } from '@/types';
import { TaskCard } from './TaskCard';
import { Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onDelete?: (taskId: string) => void;
}

export function TaskList({ tasks, loading, onDelete }: TaskListProps) {
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
        <Inbox className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Get started by creating your first task and start organizing your work.
        </p>
      </div>
    );
  }

  // Tasks grid
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}