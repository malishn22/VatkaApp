import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { LanguageFormFields } from './LanguageFormFields';
import { useDataStore } from '../../store/dataStore';

interface AddLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLanguageModal({ isOpen, onClose }: AddLanguageModalProps) {
  const { addLanguage } = useDataStore();
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
    if (!source) e.source = 'Required';
    if (!target) e.target = 'Required';
    if (source && target && source === target) { e.target = 'Must differ from source'; }
    if (!name.trim()) e.name = 'Required';
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
      title="Add Language"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
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
