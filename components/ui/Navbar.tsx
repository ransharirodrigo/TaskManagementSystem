'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    document.cookie = 'auth-token=; Max-Age=0; path=/;';
    router.push('/auth/login');
  };

  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">TaskManager</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link href="/tasks">
                <Button variant="ghost" size="sm">
                  Tasks
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/tasks/new">
              <Button size="sm">
                New Task
              </Button>
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