import { useState, useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useDataStore } from '../../store/dataStore';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { AddEditLevelModal } from './AddEditLevelModal';
import { SectionItem } from '../sections/SectionItem';
import { AddEditSectionModal } from '../sections/AddEditSectionModal';
import { Button } from '../shared/Button';
import type { Level } from '../../types';
import { useT } from '../../i18n/useT';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon } from '../shared/Icons';

interface LevelItemProps {
  level: Level;
}

export function LevelItem({ level }: LevelItemProps) {
  const { selectedLevelId, setSelectedLevel, setView } = useUIStore();
  const { deleteLevel, fetchSections, sections } = useDataStore();
  const t = useT();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isSelected = selectedLevelId === level.id;
  const levelSections = sections.filter((s) => s.level_id === level.id);

  useEffect(() => {
    if (isSelected && !expanded) {
      setExpanded(true);
      fetchSections(level.id);
    }
  }, [isSelected]);

  const handleSelect = () => {
    setSelectedLevel(level.id);
    setView('wordpairs');
    if (!expanded) {
      setExpanded(true);
      fetchSections(level.id);
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !expanded;
    setExpanded(next);
    if (next) fetchSections(level.id);
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className={`group flex items-center justify-between rounded-md px-2 py-2 cursor-pointer text-sm transition-colors ${
            isSelected
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={handleSelect}
        >
          <div className="flex items-center gap-1 min-w-0">
            <span
              className="text-gray-400 dark:text-gray-500 flex-shrink-0 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={handleToggleExpand}
            >
              {expanded ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
            </span>
            <span className="truncate">{level.name}</span>
          </div>
          <span className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
            <Button
              variant="icon"
              hoverColor="indigo"
              onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
              title={t.edit}
            >
              <PencilIcon />
            </Button>
            <Button
              variant="icon"
              hoverColor="red"
              onClick={(e) => { e.stopPropagation(); setShowDelete(true); }}
              title={t.delete}
            >
              <TrashIcon />
            </Button>
          </span>
        </div>

        {expanded && (
          <div className="pl-4 flex flex-col gap-0.5 mt-0.5">
            {levelSections.map((section) => (
              <SectionItem key={section.id} section={section} />
            ))}
            <Button
              variant="icon"
              hoverColor="indigo"
              onClick={() => setShowAddSection(true)}
              title={t.addSection}
              className="p-1.5"
            >
              <PlusIcon size={16} />
            </Button>
          </div>
        )}
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
        title={t.deleteLevelTitle}
        message={t.deleteLevelMessage(level.name)}
      />

      <AddEditSectionModal
        isOpen={showAddSection}
        onClose={() => setShowAddSection(false)}
        levelId={level.id}
      />
    </>
  );
}
