import { useUIStore } from '../../store/uiStore';
import { Toggle } from '../shared/Toggle';
import { useT } from '../../i18n/useT';

export function SettingsView() {
  const { isDark, toggleDark, lang, setLang } = useUIStore();
  const t = useT();

  return (
    <div className="max-w-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{t.settingsTitle}</h2>
      </div>

      <div className="flex flex-col gap-0 divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {/* Dark Mode */}
        <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-800">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.darkMode}</span>
          <Toggle checked={isDark} onChange={toggleDark} />
        </div>

        {/* Language */}
        <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-800">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.language}</span>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${lang === 'en' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-50 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('tr')}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${lang === 'tr' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-50 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              TR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
