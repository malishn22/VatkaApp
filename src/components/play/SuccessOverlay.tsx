import { Button } from '../shared/Button';
import { useT } from '../../i18n/useT';

interface SuccessOverlayProps {
  onNext: () => void;
  hasMore: boolean;
}

export function SuccessOverlay({ onNext, hasMore }: SuccessOverlayProps) {
  const t = useT();
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-4">
        <div className="text-5xl">🎉</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{t.roundComplete}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{hasMore ? t.readyForNextBatch : t.allDone}</p>
        <Button onClick={onNext}>{hasMore ? t.nextRound : t.finish}</Button>
      </div>
    </div>
  );
}
