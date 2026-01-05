import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        className={cn(
          'w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
