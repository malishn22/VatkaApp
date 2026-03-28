import { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useDataStore } from '../../store/dataStore';
import type { Level } from '../../types';

interface AddEditLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageId: number;
  level?: Level; // if provided, edit mode
}

export function AddEditLevelModal({ isOpen, onClose, languageId, level }: AddEditLevelModalProps) {
  const { addLevel, updateLevel, levels } = useDataStore();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(level?.name ?? '');
      setError('');
    }
  }, [isOpen, level]);

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Name is required'); return; }
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
      title={level ? 'Edit Level' : 'Add Level'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{level ? 'Save' : 'Add'}</Button>
        </>
      }
    >
      <Input
        label="Level name"
        placeholder="e.g. Beginner, A1, Unit 3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
        autoFocus
      />
    </Modal>
  );
}
