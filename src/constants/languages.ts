export const KNOWN_LANGUAGES = [
  'Afrikaans', 'Albanian', 'Arabic', 'Basque', 'Belarusian',
  'Bulgarian', 'Catalan', 'Chinese (Simplified)', 'Chinese (Traditional)',
  'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian',
  'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek',
  'Gujarati', 'Haitian Creole', 'Hebrew', 'Hindi', 'Hungarian',
  'Icelandic', 'Indonesian', 'Irish', 'Italian', 'Japanese',
  'Kannada', 'Korean', 'Latin', 'Latvian', 'Lithuanian', 'Macedonian',
  'Malay', 'Maltese', 'Norwegian', 'Persian', 'Polish', 'Portuguese',
  'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Spanish',
  'Swahili', 'Swedish', 'Tamil', 'Telugu', 'Thai', 'Turkish',
  'Ukrainian', 'Urdu', 'Vietnamese', 'Welsh', 'Yiddish',
] as const;

export type KnownLanguage = typeof KNOWN_LANGUAGES[number];
