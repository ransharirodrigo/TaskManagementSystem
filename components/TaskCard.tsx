/**
 * Task Card Component
 * Displays a single task in a card format
 */

'use client';

import { Task, TaskStatus } from '@/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { formatDateTime } from '@/lib/utils';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
  onDelete?: (taskId: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const router = useRouter();

  return (
    <Card className="p-5 hover:shadow-lg transition-shadow duration-200">
      {/* Header - Title and Status */}
      <div className="flex justify-between items-start mb-3">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
        </div>
        <Badge
          variant={task.status === TaskStatus.COMPLETED ? 'success' : 'warning'}
        >
          {task.status}
        </Badge>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className="text-gray-600 mb-4 line-clamp-2 cursor-pointer"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          {task.description}
        </p>
      )}

      {/* Footer - Date and Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDateTime(task.createdAt)}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/tasks/${task.id}`);
            }}
            title="Edit task"
          >
            <Edit className="w-4 h-4" />
          </Button>

          {onDelete && (
            <Button
              size="sm"
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}