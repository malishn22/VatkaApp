import { useState } from 'react';
import { useDataStore } from '../../store/dataStore';
import { LanguageCard } from './LanguageCard';
import { AddLanguageModal } from './AddLanguageModal';
import { Button } from '../shared/Button';
import { useT } from '../../i18n/useT';

export function LanguagesView() {
  const { languages } = useDataStore();
  const [showAdd, setShowAdd] = useState(false);
  const t = useT();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{t.languages}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.manageYourLanguagePairs}</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>{t.addLanguage}</Button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-lg mb-2">{t.noLanguagesYet}</p>
          <p className="text-sm">{t.addLanguagePairToStart}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {languages.map((lang) => (
            <LanguageCard key={lang.id} language={lang} />
          ))}
        </div>
      )}

      <AddLanguageModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
