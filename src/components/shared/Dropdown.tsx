import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, StarIcon } from './Icons';

interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  markedValues?: string[];
}

export function Dropdown({ options, value, onChange, placeholder, label, error, className = '', id, markedValues }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery('');
    }
  }, [open]);

  const filtered = options.filter((o) => {
    const matches = (str: string) =>
      str.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr')) ||
      str.toLocaleLowerCase('en').includes(query.toLocaleLowerCase('en'));
    return matches(o.label) || matches(o.value);
  });

  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  const triggerClass = `w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
  }`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        {open ? (
          <div className={triggerClass}>
            <input
              ref={inputRef}
              id={inputId}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={selected?.label ?? placeholder ?? 'Search...'}
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 min-w-0"
            />
            <ChevronDownIcon className="text-gray-400 dark:text-gray-500 flex-shrink-0 rotate-180 transition-transform duration-150" />
          </div>
        ) : (
          <button
            id={inputId}
            type="button"
            onClick={() => setOpen(true)}
            className={triggerClass}
          >
            <span className={selected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}>
              {selected ? selected.label : (placeholder ?? 'Select...')}
            </span>
            <ChevronDownIcon className="text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform duration-150" />
          </button>
        )}

        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-lg max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    opt.value === value
                      ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                >
                  <span className="flex items-center gap-1.5">
                    {markedValues?.includes(opt.value) && (
                      <StarIcon className="text-amber-400 flex-shrink-0" />
                    )}
                    {opt.label}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">No results</p>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
