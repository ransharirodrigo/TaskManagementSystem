'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  isValidTaskTitle,
  isValidTaskDescription,
} from '@/lib/validations';

export default function NewTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidTaskTitle(title)) {
      setError('Task title is required and must be under 100 characters');
      return;
    }

    if (!isValidTaskDescription(description)) {
      setError('Description must be under 1000 characters');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create task');
      }

      router.push('/tasks');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Add New Task
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Create a new task to keep track of your work.
          </p>
        </div>

        <div className="bg-white border rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />

            <Textarea
              label="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/tasks">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" isLoading={loading}>
                Create Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
