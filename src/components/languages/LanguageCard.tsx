import { useState } from 'react';
import { useDataStore } from '../../store/dataStore';
import { useUIStore } from '../../store/uiStore';
import { EditLanguageModal } from './EditLanguageModal';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { Button } from '../shared/Button';
import type { Language } from '../../types';

interface LanguageCardProps {
  language: Language;
}

export function LanguageCard({ language }: LanguageCardProps) {
  const { deleteLanguage } = useDataStore();
  const { setSelectedLanguage } = useUIStore();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => setSelectedLanguage(language.id)}
        >
          <p className="font-semibold text-gray-900 dark:text-gray-50">{language.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{language.source} → {language.target}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>Delete</Button>
        </div>
      </div>

      <EditLanguageModal isOpen={showEdit} onClose={() => setShowEdit(false)} language={language} />

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteLanguage(language.id)}
        title="Delete Language"
        message={`Delete "${language.name}"? All levels and word pairs will also be deleted.`}
      />
    </>
  );
}
