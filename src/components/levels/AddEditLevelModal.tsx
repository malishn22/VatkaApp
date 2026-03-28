import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useDataStore } from '../../store/dataStore';
import type { Level } from '../../types';
import { useT } from '../../i18n/useT';

interface AddEditLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageId: number;
  level?: Level; // if provided, edit mode
}

export function AddEditLevelModal({ isOpen, onClose, languageId, level }: AddEditLevelModalProps) {
  const { addLevel, updateLevel, levels } = useDataStore();
  const t = useT();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(level?.name ?? '');
      setError('');
    }
  }, [isOpen, level]);

  const handleSubmit = async () => {
    if (!name.trim()) { setError(t.nameIsRequired); return; }
    if (level) {
      await updateLevel(level.id, { name: name.trim() });
    } else {
      await addLevel({ language_id: languageId, name: name.trim(), position: levels.length });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={level ? t.editLevelTitle : t.addLevelTitle}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>{t.cancel}</Button>
          <Button onClick={handleSubmit}>{level ? t.save : t.add}</Button>
        </>
      }
    >
      <Input
        label={t.levelName}
        placeholder={t.levelNamePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
        autoFocus
      />
    </Modal>
  );
}
