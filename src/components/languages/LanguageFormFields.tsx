import { Dropdown } from '../shared/Dropdown';
import { Input } from '../shared/Input';
import { KNOWN_LANGUAGES } from '../../constants/languages';
import { useT } from '../../i18n/useT';

interface LanguageFormFieldsProps {
  source: string;
  target: string;
  name: string;
  onSourceChange: (v: string) => void;
  onTargetChange: (v: string) => void;
  onNameChange: (v: string) => void;
  errors?: { source?: string; target?: string; name?: string };
}

export function LanguageFormFields({
  source, target, name,
  onSourceChange, onTargetChange, onNameChange,
  errors = {},
}: LanguageFormFieldsProps) {
  const t = useT();
  const languageOptions = KNOWN_LANGUAGES.map((lang) => ({ value: lang, label: t.languageNames[lang] ?? lang }));

  const handleSourceChange = (v: string) => {
    onSourceChange(v);
    // Auto-generate name if not manually edited
    if (v && target) onNameChange(`${v} → ${target}`);
    else if (v) onNameChange(`${v} → ...`);
  };

  const handleTargetChange = (v: string) => {
    onTargetChange(v);
    if (source && v) onNameChange(`${source} → ${v}`);
    else if (source) onNameChange(`${source} → ...`);
  };

  return (
    <div className="flex flex-col gap-3">
      <Dropdown
        label={t.fromLanguage}
        options={languageOptions}
        placeholder={t.selectSourceLanguage}
        value={source}
        onChange={handleSourceChange}
        error={errors.source}
      />
      <Dropdown
        label={t.toLanguage}
        options={languageOptions}
        placeholder={t.selectTargetLanguage}
        value={target}
        onChange={handleTargetChange}
        error={errors.target}
      />
      <Input
        label={t.displayName}
        placeholder={t.displayNamePlaceholder}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        error={errors.name}
      />
    </div>
  );
}
