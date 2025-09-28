import { createContext, FC, ReactNode, useContext, useState } from "react";

interface MediatorContextValue {
  activeId: string | null;
  setActiveId: (id: string) => void;
}

const MediatorContext = createContext<MediatorContextValue | null>(null);

export const MediatorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <MediatorContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </MediatorContext.Provider>
  );
};

export const useMediator = () => {
  const ctx = useContext(MediatorContext);

  if (!ctx) throw new Error("useMediator must be used within MediatorProvider");
  return ctx;
};
