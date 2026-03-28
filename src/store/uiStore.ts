import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'languages' | 'wordpairs' | 'play';

interface UIState {
  currentView: View;
  selectedLanguageId: number | null;
  selectedLevelId: number | null;
  isDark: boolean;
  setView: (view: View) => void;
  setSelectedLanguage: (id: number | null) => void;
  setSelectedLevel: (id: number | null) => void;
  toggleDark: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      currentView: 'languages',
      selectedLanguageId: null,
      selectedLevelId: null,
      isDark: false,
      setView: (view) => set({ currentView: view }),
      setSelectedLanguage: (id) => set({ selectedLanguageId: id, selectedLevelId: null, currentView: id ? 'wordpairs' : 'languages' }),
      setSelectedLevel: (id) => set({ selectedLevelId: id, currentView: id ? 'wordpairs' : 'languages' }),
      toggleDark: () => set((state) => {
        const next = !state.isDark;
        document.documentElement.classList.toggle('dark', next);
        return { isDark: next };
      }),
    }),
    {
      name: 'ui-prefs',
      // Only persist isDark — navigation state should reset on reload
      partialize: (state) => ({ isDark: state.isDark }),
    }
  )
);

// Apply persisted dark mode on startup
if (useUIStore.getState().isDark) {
  document.documentElement.classList.add('dark');
}
