import { Modal } from './Modal';
import { Button } from './Button';
import { useT } from '../../i18n/useT';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel }: ConfirmDialogProps) {
  const t = useT();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>{t.cancel}</Button>
          <Button variant="danger" onClick={() => { onConfirm(); onClose(); }}>{confirmLabel ?? t.confirmDelete}</Button>
        </>
      }
    >
      <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
    </Modal>
  );
}
