interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
      <div
        onClick={onChange}
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </div>
    </label>
  );
}
