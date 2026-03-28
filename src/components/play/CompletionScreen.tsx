import { Button } from '../shared/Button';
import { useT } from '../../i18n/useT';

interface CompletionScreenProps {
  total: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export function CompletionScreen({ total, onPlayAgain, onExit }: CompletionScreenProps) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="text-6xl">🏆</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{t.allDone}</h2>
      <p className="text-gray-500 dark:text-gray-400">{t.youMatchedAll(total)}</p>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onExit}>{t.backToWords}</Button>
        <Button onClick={onPlayAgain}>{t.playAgain}</Button>
      </div>
    </div>
  );
}
