import { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useDataStore } from '../../store/dataStore';
import { useDragContext } from '../../context/DragContext';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { AddEditSectionModal } from './AddEditSectionModal';
import { Button } from '../shared/Button';
import type { Section } from '../../types';
import { useT } from '../../i18n/useT';
import { PencilIcon, TrashIcon } from '../shared/Icons';

interface SectionItemProps {
  section: Section;
}

export function SectionItem({ section }: SectionItemProps) {
  const { selectedSectionId, setSelectedSection, setView } = useUIStore();
  const { deleteSection, updateWordPair } = useDataStore();
  const { draggingPairId, setDraggingPairId } = useDragContext();
  const t = useT();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const isSelected = selectedSectionId === section.id;

  const handleSelect = () => {
    setSelectedSection(section.id);
    setView('wordpairs');
  };

  return (
    <>
      <div
        className={`group flex items-center justify-between rounded-md px-3 py-1.5 cursor-pointer text-sm transition-colors ${
          isSelected
            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-medium'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
        } ${isDragOver ? 'ring-2 ring-inset ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/40' : ''} ${draggingPairId !== null && !isDragOver ? 'border border-dashed border-indigo-300 dark:border-indigo-600' : ''}`}
        onClick={handleSelect}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setIsDragOver(true); }}
        onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragOver(false); }}
        onDrop={async (e) => {
          e.preventDefault();
          setIsDragOver(false);
          const pairId = draggingPairId ?? Number(e.dataTransfer.getData('text/plain'));
          if (!pairId) return;
          await updateWordPair(pairId, { level_id: section.level_id, section_id: section.id });
          setDraggingPairId(null);
        }}
      >
        <span className="truncate text-xs">{section.name}</span>
        <span className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
          <Button
            variant="icon"
            hoverColor="indigo"
            onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
            title={t.edit}
          >
            <PencilIcon size={14} />
          </Button>
          <Button
            variant="icon"
            hoverColor="red"
            onClick={(e) => { e.stopPropagation(); setShowDelete(true); }}
            title={t.delete}
          >
            <TrashIcon size={14} />
          </Button>
        </span>
      </div>

      <AddEditSectionModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        levelId={section.level_id}
        section={section}
      />

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteSection(section.id)}
        title={t.deleteSectionTitle}
        message={t.deleteSectionMessage(section.name)}
      />
    </>
  );
}
