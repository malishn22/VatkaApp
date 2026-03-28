import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputSize?: 'sm' | 'md';
}

const sizeClasses = {
  md: 'rounded-md border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2',
  sm: 'rounded border-indigo-300 dark:border-indigo-700 px-2 py-1 focus:ring-1',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, inputSize = 'md', className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-indigo-500 focus:border-transparent ${sizeClasses[inputSize]} ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
