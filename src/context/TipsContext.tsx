// contexts/CodeTipsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNextBatch, getData } from '@api/grapiql';
import { environments } from '@src/constants';
import fetchWithCache from '@src/utils/fetch-with-cache';

interface CodeTipsContextType {
  codeTips: any[];
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>;
  fetchAdditionalData: (endpoint: string, start: number) => Promise<void>;
}

const CodeTipsContext = createContext<CodeTipsContextType | undefined>(undefined);

const CodeTipsProvider = ({ children }: { children: React.ReactNode }) => {
  const [codeTips, setCodeTips] = useState<any[]>([]);

  const fetchCodeTips = async () => {
    const techTips = await fetchWithCache('techTips', () => getData('techTips'));

    setCodeTips(techTips);
  };

  const fetchAdditionalData = async (endpoint: string, start: number) => {
    try {
      const newTips = await fetchNextBatch('products', start as number);
      if (!newTips.data && newTips.error) {
        return;
      }
      setCodeTips(prev => {
        const existingIds = prev.map((item) => item.id);
        const filteredTips = newTips.data.filter((item: any) => !existingIds.includes(item.id));
        return [...prev, ...filteredTips];
      });
    } catch (error: any) { }
  };

  useEffect(() => {
    fetchCodeTips();
  }, []);

  return (
    <CodeTipsContext.Provider value={{ codeTips, setCodeTips, fetchAdditionalData }}>
      {children}
    </CodeTipsContext.Provider>
  );
};

export const useTips = () => {
  const context = useContext(CodeTipsContext);
  if (context === undefined) throw new Error("useCodeTips must be used within a CodeTipsProvider");
  return context;
};

export default CodeTipsProvider;