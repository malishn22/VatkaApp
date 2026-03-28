import { ClipboardEvent, RefObject } from 'react';

/**
 * Returns an onPaste handler that tries to split pasted text into two parts
 * using common separators ( - ,  / , /, -, or first whitespace).
 * If a split is found, calls onPair(left, right), focuses focusAfterRef, and prevents default paste.
 */
export function usePairedPaste(
  onPair: (left: string, right: string) => void,
  focusAfterRef?: RefObject<HTMLInputElement>
): (e: ClipboardEvent<HTMLInputElement>) => void {
  const handlePair = (left: string, right: string) => {
    onPair(left, right);
    focusAfterRef?.current?.focus();
  };

  return (e) => {
    const text = e.clipboardData.getData('text').trim();
    const separators = [' - ', ' / ', '/', '-'];
    for (const sep of separators) {
      const idx = text.indexOf(sep);
      if (idx !== -1) {
        const left = text.slice(0, idx).trim();
        const right = text.slice(idx + sep.length).trim();
        if (left && right) {
          e.preventDefault();
          handlePair(left, right);
          return;
        }
      }
    }
    // fallback: split on first whitespace sequence
    const match = text.match(/^(\S+)\s+(.+)$/);
    if (match) {
      e.preventDefault();
      handlePair(match[1], match[2]);
    }
    // else: single word — let default paste happen
  };
}
