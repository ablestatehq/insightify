// contexts/CodeTipsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData } from '@api/grapiql';

interface CodeTipsContextType {
  codeTips: any[];
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>;
}

const CodeTipsContext = createContext<CodeTipsContextType | undefined>(undefined);

export const CodeTipsProvider = ({ children }: { children: React.ReactNode }) => {
  const [codeTips, setCodeTips] = useState<any[]>([]);

  useEffect(() => {
    const fetchCodeTips = async () => {
      const techTips = (await getData('techTips')).data;
      setCodeTips(techTips);
    };

    fetchCodeTips();
  }, []);

  return (
    <CodeTipsContext.Provider value={{ codeTips, setCodeTips }}>
      {children}
    </CodeTipsContext.Provider>
  );
};

export const useCodeTips = () => {
  const context = useContext(CodeTipsContext);
  if (context === undefined) throw new Error("useCodeTips must be used within a CodeTipsProvider");
  return context;
};
