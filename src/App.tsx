import { useEffect } from 'react';
import { useUIStore } from './store/uiStore';
import { Layout } from './components/layout/Layout';
import { LanguagesView } from './components/languages/LanguagesView';
import { WordPairsView } from './components/wordpairs/WordPairsView';
import { PlayView } from './components/play/PlayView';
import { SettingsView } from './components/settings/SettingsView';
import { runMigrations } from './db/client';

function App() {
  const { currentView } = useUIStore();

  useEffect(() => {
    runMigrations();
  }, []);

  return (
    <Layout>
      {currentView === 'languages' && <LanguagesView />}
      {currentView === 'wordpairs' && <WordPairsView />}
      {currentView === 'play' && <PlayView />}
      {currentView === 'settings' && <SettingsView />}
    </Layout>
  );
}

export default App;
