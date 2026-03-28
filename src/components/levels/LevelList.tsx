import { useState } from 'react';
import { LevelItem } from './LevelItem';
import { AddEditLevelModal } from './AddEditLevelModal';
import { Button } from '../shared/Button';
import type { Level } from '../../types';
import { useT } from '../../i18n/useT';

interface LevelListProps {
  levels: Level[];
  languageId: number;
}

export function LevelList({ levels, languageId }: LevelListProps) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.levels}</span>
        <Button variant="text" textColor="indigo" size="xs" onClick={() => setShowAdd(true)}>
          {t.addLevel}
        </Button>
      </div>

      {levels.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 px-1 py-2">{t.noLevelsYet}</p>
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
