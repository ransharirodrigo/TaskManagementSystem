/**
 * Reusable Card Component
 * Container with white background and shadow
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-md', className)}>
      {children}
    </div>
  );
}