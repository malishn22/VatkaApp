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
  setView: (view: View) => void;
  setSelectedLanguage: (id: number | null) => void;
  setSelectedLevel: (id: number | null) => void;
  toggleDark: () => void;
  setLang: (lang: Lang) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      currentView: 'languages',
      selectedLanguageId: null,
      selectedLevelId: null,
      isDark: true,
      lang: 'en',
      setView: (view) => set({ currentView: view }),
      setSelectedLanguage: (id) => set({ selectedLanguageId: id, selectedLevelId: null, currentView: id ? 'wordpairs' : 'languages' }),
      setSelectedLevel: (id) => set({ selectedLevelId: id, currentView: id ? 'wordpairs' : 'languages' }),
      toggleDark: () => set((state) => {
        const next = !state.isDark;
        document.documentElement.classList.toggle('dark', next);
        return { isDark: next };
      }),
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'ui-prefs',
      // Only persist isDark and lang — navigation state should reset on reload
      partialize: (state) => ({ isDark: state.isDark, lang: state.lang }),
    }
  )
);

// Apply persisted dark mode on startup
document.documentElement.classList.toggle('dark', useUIStore.getState().isDark);
