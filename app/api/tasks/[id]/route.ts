import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth-server';

export async function GET(req: NextRequest, context: { params: any }) {
  const { params } = context;
  const { id } = await params; 

  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const task = await prisma.task.findFirst({
      where: { id, userId: user.userId },
    });

    if (!task) return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: task });
  } catch (err) {
    console.error('GET task error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: any }) {
  const { params } = context;
  const { id } = await params;

  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    const updated = await prisma.task.updateMany({
      where: { id, userId: user.userId },
      data: { ...body, updatedAt: new Date() },
    });

    if (!updated.count) return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });

    const task = await prisma.task.findUnique({ where: { id } });

    return NextResponse.json({ success: true, data: task });
  } catch (err) {
    console.error('PATCH task error:', err);
    return NextResponse.json({ success: false, error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: any }) {
  const { params } = context;
  const { id } = await params;

  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const deleted = await prisma.task.deleteMany({
      where: { id, userId: user.userId },
    });

    if (!deleted.count) return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE task error:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete task' }, { status: 500 });
  }
}
