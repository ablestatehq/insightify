import { OpportunityData } from "@src/types";
import React, { createContext, useContext, useState } from "react";

interface OpportunityContextType {
  offers: OpportunityData[];
  setOffers: React.Dispatch<React.SetStateAction<OpportunityData[]>>;
}

export const OpportunityContext = createContext<OpportunityContextType | undefined>(undefined);

export const OpportunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offers, setOffers] = useState<OpportunityData[]>([]);
  return (
    <OpportunityContext.Provider value={{ offers, setOffers }}>
      {children}
    </OpportunityContext.Provider>
  )
}

export const useOffers = () => {
  const context = useContext(OpportunityContext);
  if (context === undefined) throw new Error("Offers must be used within its provider");
  return context;
}