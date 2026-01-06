'use client';
import React from 'react';
import { Task, TaskStatus } from '@/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { formatDateTime } from '@/lib/utils';
import { Eye, Trash2, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
  onDelete?: (taskId: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const router = useRouter();

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    router.push(`/tasks/${task.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(task.id);
    }
  };

  return (
    <Card 
      className="p-5 hover:shadow-lg transition-shadow duration-200 cursor-pointer" 
      onClick={handleViewDetails}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
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

      {task.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDateTime(task.createdAt)}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleViewDetails}
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </Button>

          {onDelete && (
            <Button
              size="sm"
              variant="danger"
              onClick={handleDelete}
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