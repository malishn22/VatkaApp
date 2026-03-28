import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'text' | 'icon';
type Size = 'xs' | 'sm' | 'md';
type TextColor = 'default' | 'indigo' | 'red' | 'green';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  textColor?: TextColor;
  hoverColor?: 'indigo' | 'red';
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
  text: '',   // color handled by textColorClasses below
  icon: 'text-gray-400 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors', // hoverColor handled below
};

const sizeClasses: Record<Size, string> = {
  xs: 'px-1 py-0.5 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
};

const textColorClasses: Record<TextColor, string> = {
  default: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline',
  indigo: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline',
  red: 'text-red-600 hover:text-red-800 hover:underline',
  green: 'text-green-700 dark:text-green-400 hover:text-green-800 hover:underline',
};

const iconHoverClasses: Record<'indigo' | 'red', string> = {
  indigo: 'hover:text-indigo-600',
  red: 'hover:text-red-600',
};

export function Button({
  variant = 'primary',
  size = 'md',
  textColor = 'default',
  hoverColor,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isText = variant === 'text';
  const isIcon = variant === 'icon';

  // text and icon variants don't use size-based padding
  const sizeClass = (isText || isIcon) ? '' : sizeClasses[size];
  const variantClass = variantClasses[variant];
  const textColorClass = isText ? textColorClasses[textColor] : '';
  const iconHoverClass = isIcon && hoverColor ? iconHoverClasses[hoverColor] : '';

  // text and icon variants don't need the base inline-flex/rounded-md/font-medium wrapper
  const baseClass = (isText || isIcon)
    ? 'inline-flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    : 'inline-flex items-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${textColorClass} ${iconHoverClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
