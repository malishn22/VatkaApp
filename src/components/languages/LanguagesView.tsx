import { useState } from 'react';
import { useDataStore } from '../../store/dataStore';
import { LanguageCard } from './LanguageCard';
import { AddLanguageModal } from './AddLanguageModal';
import { Button } from '../shared/Button';

export function LanguagesView() {
  const { languages } = useDataStore();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Languages</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your language pairs</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>+ Add Language</Button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-lg mb-2">No languages yet</p>
          <p className="text-sm">Add a language pair to get started</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {languages.map((lang) => (
            <LanguageCard key={lang.id} language={lang} />
          ))}
        </div>
      )}

      <AddLanguageModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
