import { useUIStore } from './store/uiStore';
import { Layout } from './components/layout/Layout';
import { LanguagesView } from './components/languages/LanguagesView';
import { WordPairsView } from './components/wordpairs/WordPairsView';
import { PlayView } from './components/play/PlayView';

function App() {
  const { currentView } = useUIStore();

  return (
    <Layout>
      {currentView === 'languages' && <LanguagesView />}
      {currentView === 'wordpairs' && <WordPairsView />}
      {currentView === 'play' && <PlayView />}
    </Layout>
  );
}

export default App;
