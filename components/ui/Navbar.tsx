'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function Navbar() {
    const handleLogoClick = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          router.push('/tasks');
        } else {
          router.push('/auth/login');
        }
      } catch {
        router.push('/auth/login');
      }
    };
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
      router.push('/auth/login');
      router.refresh();
    }
  };

  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              className="flex items-center bg-transparent border-none p-0 m-0 cursor-pointer"
              onClick={handleLogoClick}
              type="button"
            >
              <span className="text-xl font-bold text-blue-600">TaskManager</span>
            </button>
            
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/tasks/new">
              <Button size="sm">New Task</Button>
            </Link>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
