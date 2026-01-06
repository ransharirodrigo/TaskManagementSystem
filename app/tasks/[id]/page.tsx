'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task, TaskStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatDateTime } from '@/lib/utils';
import { ArrowLeft, Edit, Trash2, Calendar, Clock } from 'lucide-react';

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/tasks/${taskId}`, { credentials: 'include' });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load task');
          setTask(null);
        } else {
          setTask(data.data);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while loading the task');
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleBack = () => router.push('/tasks');
  const handleEdit = () => router.push(`/tasks/${taskId}/edit`);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        router.push('/tasks');
      } else {
        alert('Failed to delete task: ' + data.error);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting the task');
    }
  };

  const handleStatusToggle = async () => {
    if (!task) return;

    const newStatus = task.status === TaskStatus.COMPLETED
      ? TaskStatus.PENDING
      : TaskStatus.COMPLETED;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setTask(data.data);
      } else {
        alert('Failed to update task: ' + data.error);
      }
    } catch (err) {
      console.error('Status toggle error:', err);
      alert('An error occurred while updating the task');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading task...</p>
      </div>
    </div>
  );

  if (error || !task) return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Task not found'}</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tasks
          </Button>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
     
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tasks
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        </div>

        <Card className="p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold flex-1">{task.title}</h1>
            <Badge variant={task.status === TaskStatus.COMPLETED ? 'success' : 'warning'}>
              {task.status}
            </Badge>
          </div>

          <div className="mb-6">
            <p className="text-black whitespace-pre-wrap">{task.description || 'No description provided.'}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-sm font-medium">Created:</span>
              <span className="ml-2">{formatDateTime(task.createdAt)}</span>
            </div>

            {task.updatedAt && (
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-sm font-medium">Last Updated:</span>
                <span className="ml-2">{formatDateTime(task.updatedAt)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <Button
              onClick={handleStatusToggle}
              variant={task.status === TaskStatus.COMPLETED ? 'secondary' : 'primary'}
              className="w-full"
            >
              {task.status === TaskStatus.COMPLETED ? 'Mark as Pending' : 'Mark as Completed'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
