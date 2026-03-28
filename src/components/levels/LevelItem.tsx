import { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useDataStore } from '../../store/dataStore';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { AddEditLevelModal } from './AddEditLevelModal';
import { Button } from '../shared/Button';
import type { Level } from '../../types';

interface LevelItemProps {
  level: Level;
}

export function LevelItem({ level }: LevelItemProps) {
  const { selectedLevelId, setSelectedLevel, setView } = useUIStore();
  const { deleteLevel } = useDataStore();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isSelected = selectedLevelId === level.id;

  const handleSelect = () => {
    setSelectedLevel(level.id);
    setView('wordpairs');
  };

  return (
    <>
      <div
        className={`group flex items-center justify-between rounded-md px-3 py-2 cursor-pointer text-sm transition-colors ${
          isSelected ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
        onClick={handleSelect}
      >
        <span className="truncate">{level.name}</span>
        <span className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
          <Button
            variant="icon"
            hoverColor="indigo"
            onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
            title="Edit"
          >
            ✎
          </Button>
          <Button
            variant="icon"
            hoverColor="red"
            onClick={(e) => { e.stopPropagation(); setShowDelete(true); }}
            title="Delete"
          >
            ✕
          </Button>
        </span>
      </div>

      <AddEditLevelModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        languageId={level.language_id}
        level={level}
      />

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteLevel(level.id)}
        title="Delete Level"
        message={`Delete "${level.name}"? All word pairs in this level will also be deleted.`}
      />
    </>
  );
}
