'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Task, Pagination as PaginationInfo } from '@/types';
import { TaskList } from '@/components/TaskList';
import { Pagination } from '@/components/Pagination';

export default function TasksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const currentPage = Number(searchParams.get('page') || '1');

  const fetchTasks = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks?page=${page}&limit=10`);
      const data = await response.json();

      if (data.success) {
        setTasks(data.data);
        setPagination(data.pagination);
      } else if (response.status === 401) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/tasks?page=${page}`);
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchTasks(currentPage);
      } else {
        alert('Failed to delete task: ' + data.error);
      }
    } catch (error) {
      alert('An error occurred while deleting the task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!loading && tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {pagination.total}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tasks.filter((t) => t.status === 'PENDING').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {tasks.filter((t) => t.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        )}

        <TaskList tasks={tasks} loading={loading} onDelete={handleDelete} />

        {!loading && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}