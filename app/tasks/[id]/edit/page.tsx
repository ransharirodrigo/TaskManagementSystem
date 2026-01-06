'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Task, TaskStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditTaskPage() {
    const router = useRouter();
    const params = useParams();
    const taskId = params?.id as string;

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);

    useEffect(() => {
        const fetchTask = async () => {
            if (!taskId) return;

            setLoading(true);
            try {
                const res = await fetch(`/api/tasks/${taskId}`, { credentials: 'include' });
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || 'Failed to load task');
                    setTask(null);
                } else {
                    setTask(data.data);
                    setTitle(data.data.title);
                    setDescription(data.data.description || '');
                    setStatus(data.data.status);
                    setError(null);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load task');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleBack = () => router.push(`/tasks/${taskId}`);

    const handleSave = async () => {
        if (!taskId) return;
        setSaving(true);

        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ title, description, status }),
            });

            const data = await res.json();

            if (!data.success) {
                alert('Failed to update task: ' + data.error);
            } else {
                router.push(`/tasks/${taskId}`); 
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-gray-600">Loading task...</p>
        </div>
    );

    if (error || !task) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-red-600">{error || 'Task not found'}</p>
            <Button onClick={handleBack} className="ml-4">Back</Button>
        </div>
    );

    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Task
                    </Button>
                    <h1 className="text-2xl font-bold">Edit Task</h1>
                </div>

                <Card className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea value={description} onChange={e => setDescription(e.target.value)} />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={handleBack}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave} disabled={saving}>
                            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
