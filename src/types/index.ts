export interface Section {
  id: number;
  level_id: number;
  name: string;
  position: number;
  created_at?: string;
}

export interface Language {
  id: number;
  name: string;
  source: string;
  target: string;
  created_at?: string;
}

export interface Level {
  id: number;
  language_id: number;
  name: string;
  position: number;
  created_at?: string;
}

export interface WordPair {
  id: number;
  level_id: number;
  section_id: number | null;
  source: string;
  target: string;
  disabled?: boolean;
  created_at?: string;
}
