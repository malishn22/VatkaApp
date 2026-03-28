import { Button } from '../shared/Button';

interface CompletionScreenProps {
  total: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export function CompletionScreen({ total, onPlayAgain, onExit }: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="text-6xl">🏆</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">All done!</h2>
      <p className="text-gray-500 dark:text-gray-400">You matched all {total} word pairs.</p>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onExit}>← Back to words</Button>
        <Button onClick={onPlayAgain}>Play again</Button>
      </div>
    </div>
  );
}
