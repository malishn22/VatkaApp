import { useState } from 'react';
import { LevelItem } from './LevelItem';
import { AddEditLevelModal } from './AddEditLevelModal';
import { Button } from '../shared/Button';
import type { Level } from '../../types';

interface LevelListProps {
  levels: Level[];
  languageId: number;
}

export function LevelList({ levels, languageId }: LevelListProps) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Levels</span>
        <Button variant="text" textColor="indigo" size="xs" onClick={() => setShowAdd(true)}>
          + Add
        </Button>
      </div>

      {levels.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 px-1 py-2">No levels yet.</p>
      ) : (
        levels.map((level) => <LevelItem key={level.id} level={level} />)
      )}

      <AddEditLevelModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        languageId={languageId}
      />
    </div>
  );
}
