import { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useDataStore } from '../../store/dataStore';
import { usePlayStore } from '../../store/playStore';
import { WordPairRow } from './WordPairRow';
import { AddWordPairForm } from './AddWordPairForm';
import { Button } from '../shared/Button';
import { useT } from '../../i18n/useT';

export function WordPairsView() {
  const { selectedLevelId, selectedLanguageId, setView } = useUIStore();
  const { levels, languages, wordPairs, fetchWordPairs } = useDataStore();
  const { initGame } = usePlayStore();
  const t = useT();

  const level = levels.find((l) => l.id === selectedLevelId);
  const language = languages.find((l) => l.id === selectedLanguageId);

  useEffect(() => {
    if (selectedLevelId !== null) {
      fetchWordPairs(selectedLevelId);
    }
  }, [selectedLevelId]);

  const activePairs = wordPairs.filter((p) => !p.disabled);

  const handlePlay = () => {
    if (activePairs.length < 2) return;
    initGame(activePairs);
    setView('play');
  };

  if (!level) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500">
        <p>{t.selectLevelFromSidebar}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{language?.name}</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{level.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {wordPairs.length} {wordPairs.length !== 1 ? t.wordPairs : t.wordPair}
          </p>
        </div>
        <Button
          onClick={handlePlay}
          disabled={activePairs.length < 2}
          title={activePairs.length < 2 ? t.needAtLeastTwoWordPairs : ''}
        >
          {t.play}
        </Button>
      </div>

      {wordPairs.length === 0 ? (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          <p>{t.noWordPairsYet}</p>
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {language?.source ?? t.source}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {language?.target ?? t.target}
                </th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {wordPairs.map((pair) => (
                <WordPairRow key={pair.id} pair={pair} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddWordPairForm
        levelId={level.id}
        sourceLabel={language?.source ?? t.source}
        targetLabel={language?.target ?? t.target}
      />
    </div>
  );
}
