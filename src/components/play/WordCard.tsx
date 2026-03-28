interface WordCardProps {
  text: string;
  isMatched: boolean;
  isSelected: boolean;
  isWrong: boolean;
  onClick: () => void;
}

export function WordCard({ text, isMatched, isSelected, isWrong, onClick }: WordCardProps) {
  let classes =
    'rounded-xl border-2 px-5 py-3 text-sm font-medium cursor-pointer transition-all select-none text-center ';

  if (isMatched) {
    classes += 'border-green-400 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 cursor-default line-through opacity-60';
  } else if (isWrong) {
    classes += 'border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 animate-shake';
  } else if (isSelected) {
    classes += 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 shadow-md scale-105';
  } else {
    classes += 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:shadow-sm';
  }

  return (
    <div className={classes} onClick={isMatched ? undefined : onClick}>
      {text}
    </div>
  );
}
