import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { LanguageFormFields } from './LanguageFormFields';
import { useDataStore } from '../../store/dataStore';
import { useT } from '../../i18n/useT';

interface AddLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLanguageModal({ isOpen, onClose }: AddLanguageModalProps) {
  const { addLanguage, languages } = useDataStore();
  const t = useT();
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ source?: string; target?: string; name?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) { setSource(''); setTarget(''); setName(''); setErrors({}); setSubmitError(null); }
  }, [isOpen]);

  const validate = () => {
    const e: typeof errors = {};
    if (!source) e.source = t.required;
    if (!target) e.target = t.required;
    if (source && target && source === target) { e.target = t.mustDifferFromSource; }
    if (!name.trim()) e.name = t.required;
    if (source && target && source !== target) {
      const duplicate = languages.find((l) => l.source === source && l.target === target);
      if (duplicate) e.name = t.languageAlreadyExists;
    }
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      await addLanguage({ name: name.trim(), source, target });
      onClose();
    } catch (err) {
      setSubmitError(String(err));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.addLanguageTitle}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>{t.cancel}</Button>
          <Button onClick={handleSubmit}>{t.add}</Button>
        </>
      }
    >
      <LanguageFormFields
        source={source} target={target} name={name}
        onSourceChange={setSource} onTargetChange={setTarget} onNameChange={setName}
        errors={errors}
      />
      {submitError && (
        <p className="text-sm text-red-600 mt-1">{submitError}</p>
      )}
    </Modal>
  );
}
