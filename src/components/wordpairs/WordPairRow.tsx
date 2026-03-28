import { useState } from 'react';
import { useDataStore } from '../../store/dataStore';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import type { WordPair } from '../../types';

interface WordPairRowProps {
  pair: WordPair;
}

export function WordPairRow({ pair }: WordPairRowProps) {
  const { updateWordPair, deleteWordPair } = useDataStore();
  const [editing, setEditing] = useState(false);
  const [source, setSource] = useState(pair.source);
  const [target, setTarget] = useState(pair.target);
  const [showDelete, setShowDelete] = useState(false);

  const handleSave = async () => {
    if (source.trim() && target.trim()) {
      await updateWordPair(pair.id, { source: source.trim(), target: target.trim() });
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setSource(pair.source);
    setTarget(pair.target);
    setEditing(false);
  };

  if (editing) {
    return (
      <tr className="bg-indigo-50 dark:bg-indigo-950">
        <td className="px-4 py-2">
          <Input
            inputSize="sm"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
            autoFocus
            className="w-full"
          />
        </td>
        <td className="px-4 py-2">
          <Input
            inputSize="sm"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
            className="w-full"
          />
        </td>
        <td className="px-4 py-2 text-right">
          <div className="flex gap-2 justify-end">
            <Button variant="text" textColor="green" size="xs" onClick={handleSave}>Save</Button>
            <Button variant="text" textColor="default" size="xs" onClick={handleCancel}>Cancel</Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <tr className="group hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
        <td className="px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200">{pair.source}</td>
        <td className="px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200">{pair.target}</td>
        <td className="px-4 py-2.5 text-right">
          <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="text" textColor="indigo" size="xs" onClick={() => setEditing(true)}>Edit</Button>
            <Button variant="text" textColor="red" size="xs" onClick={() => setShowDelete(true)}>Delete</Button>
          </div>
        </td>
      </tr>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteWordPair(pair.id)}
        title="Delete Word Pair"
        message={`Delete "${pair.source} → ${pair.target}"?`}
      />
    </>
  );
}
