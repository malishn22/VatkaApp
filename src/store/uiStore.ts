import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '../i18n/translations';

export type View = 'languages' | 'wordpairs' | 'play' | 'settings';

interface UIState {
  currentView: View;
  selectedLanguageId: number | null;
  selectedLevelId: number | null;
  isDark: boolean;
  lang: Lang;
  favoriteLanguages: string[];
  setView: (view: View) => void;
  setSelectedLanguage: (id: number | null) => void;
  setSelectedLevel: (id: number | null) => void;
  toggleDark: () => void;
  setLang: (lang: Lang) => void;
  toggleFavoriteLanguage: (lang: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      currentView: 'languages',
      selectedLanguageId: null,
      selectedLevelId: null,
      isDark: true,
      lang: 'en',
      favoriteLanguages: [],
      setView: (view) => set({ currentView: view }),
      setSelectedLanguage: (id) => set({ selectedLanguageId: id, selectedLevelId: null, currentView: id ? 'wordpairs' : 'languages' }),
      setSelectedLevel: (id) => set({ selectedLevelId: id, currentView: id ? 'wordpairs' : 'languages' }),
      toggleDark: () => set((state) => {
        const next = !state.isDark;
        document.documentElement.classList.toggle('dark', next);
        return { isDark: next };
      }),
      setLang: (lang) => set({ lang }),
      toggleFavoriteLanguage: (lang) => {
        const { favoriteLanguages } = get();
        if (favoriteLanguages.includes(lang)) {
          set({ favoriteLanguages: favoriteLanguages.filter((l) => l !== lang) });
        } else {
          set({ favoriteLanguages: [...favoriteLanguages, lang] });
        }
      },
    }),
    {
      name: 'ui-prefs',
      partialize: (state) => ({ isDark: state.isDark, lang: state.lang, favoriteLanguages: state.favoriteLanguages }),
    }
  )
);

// Apply persisted dark mode on startup
document.documentElement.classList.toggle('dark', useUIStore.getState().isDark);
