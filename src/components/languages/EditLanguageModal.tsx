import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { LanguageFormFields } from './LanguageFormFields';
import { useDataStore } from '../../store/dataStore';
import type { Language } from '../../types';
import { useT } from '../../i18n/useT';

interface EditLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function EditLanguageModal({ isOpen, onClose, language }: EditLanguageModalProps) {
  const { updateLanguage } = useDataStore();
  const t = useT();
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ source?: string; target?: string; name?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setSource(language.source);
      setTarget(language.target);
      setName(language.name);
      setErrors({});
    }
  }, [isOpen, language]);

  const validate = () => {
    const e: typeof errors = {};
    if (!source) e.source = t.required;
    if (!target) e.target = t.required;
    if (source && target && source === target) e.target = t.mustDifferFromSource;
    if (!name.trim()) e.name = t.required;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    await updateLanguage(language.id, { name: name.trim(), source, target });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.editLanguageTitle}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>{t.cancel}</Button>
          <Button onClick={handleSubmit}>{t.save}</Button>
        </>
      }
    >
      <LanguageFormFields
        source={source} target={target} name={name}
        onSourceChange={setSource} onTargetChange={setTarget} onNameChange={setName}
        errors={errors}
      />
    </Modal>
  );
}
