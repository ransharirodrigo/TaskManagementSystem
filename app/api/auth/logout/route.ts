import { NextRequest, NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export async function POST(_request: NextRequest) {
  await removeAuthCookie();
  return NextResponse.json({ message: 'Logged out successfully' });
}
