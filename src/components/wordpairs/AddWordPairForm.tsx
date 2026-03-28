import { useState } from 'react';
import { useDataStore } from '../../store/dataStore';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { useT } from '../../i18n/useT';

interface AddWordPairFormProps {
  levelId: number;
  sourceLabel: string;
  targetLabel: string;
}

export function AddWordPairForm({ levelId, sourceLabel, targetLabel }: AddWordPairFormProps) {
  const { addWordPair } = useDataStore();
  const t = useT();
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!source.trim() || !target.trim()) { setError(t.bothFieldsRequired); return; }
    await addWordPair({ level_id: levelId, source: source.trim(), target: target.trim() });
    setSource('');
    setTarget('');
    setError('');
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t.addWordPair}</p>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Input
            label={sourceLabel}
            placeholder={t.wordIn(sourceLabel)}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Input
            label={targetLabel}
            placeholder={t.wordIn(targetLabel)}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
            className="w-full"
          />
        </div>
        <Button onClick={handleAdd} className="mb-0.5">{t.add}</Button>
      </div>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
