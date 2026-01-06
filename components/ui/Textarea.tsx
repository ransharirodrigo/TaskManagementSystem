import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm mb-1">
          {label}
        </label>
      )}

      <textarea
        className={cn(
          'w-full px-3 py-2 border rounded',
          'text-sm leading-relaxed',
          'focus:outline-none focus:ring focus:ring-blue-500',
          'resize-y',
          error && 'border-red-500',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
