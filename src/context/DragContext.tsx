import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface DragContextValue {
  draggingPairId: number | null;
  setDraggingPairId: (id: number | null) => void;
}

const DragContext = createContext<DragContextValue>({
  draggingPairId: null,
  setDraggingPairId: () => {},
});

export function DragProvider({ children }: { children: ReactNode }) {
  const [draggingPairId, setDraggingPairId] = useState<number | null>(null);
  return (
    <DragContext.Provider value={{ draggingPairId, setDraggingPairId }}>
      {children}
    </DragContext.Provider>
  );
}

export function useDragContext() {
  return useContext(DragContext);
}
