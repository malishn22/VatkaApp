import { useUIStore } from '../store/uiStore';
import { translations } from './translations';

export function useT() {
  const lang = useUIStore((s) => s.lang);
  return translations[lang];
}
