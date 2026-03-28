import { Button } from '../shared/Button';

interface SuccessOverlayProps {
  onNext: () => void;
  hasMore: boolean;
}

export function SuccessOverlay({ onNext, hasMore }: SuccessOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-4">
        <div className="text-5xl">🎉</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Round complete!</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{hasMore ? 'Ready for the next batch?' : 'All done!'}</p>
        <Button onClick={onNext}>{hasMore ? 'Next Round →' : 'Finish'}</Button>
      </div>
    </div>
  );
}
