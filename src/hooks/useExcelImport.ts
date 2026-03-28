import { useRef } from 'react';
import * as XLSX from 'xlsx';

export interface ParsedPair {
  source: string;
  target: string;
}

/**
 * Reusable hook for importing word pairs from an Excel file.
 * Returns a trigger function and props for a hidden file input element.
 * Parses column A as source and column B as target from the first sheet.
 */
export function useExcelImport(onImport: (rows: ParsedPair[]) => void) {
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerImport = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      const pairs: ParsedPair[] = [];
      for (const row of rows) {
        const source = String(row[0] ?? '').trim();
        const target = String(row[1] ?? '').trim();
        if (source && target) {
          pairs.push({ source, target });
        }
      }

      onImport(pairs);
    };
    reader.readAsArrayBuffer(file);

    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  const fileInputProps = {
    ref: inputRef,
    type: 'file' as const,
    accept: '.xlsx,.xls,.ods',
    style: { display: 'none' } as React.CSSProperties,
    onChange: handleFileChange,
  };

  return { triggerImport, fileInputProps };
}
