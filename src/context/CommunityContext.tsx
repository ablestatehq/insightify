import React, {createContext, useState} from "react";

interface CommunityContextType {
  community: any[],
  setCommunity: React.Dispatch<React.SetStateAction<any[]>>,
}

export const CommunityContext = createContext<CommunityContextType>({
  community: [],
  setCommunity: () => { },
});

const CommunityProvider: React.FC<{ children: React.ReactDOM }> = ({ children }) => {
  const [community, setCommunity] = useState<any[]>([])
  return (
    <CommunityContext.Provider value={{community, setCommunity}}>

    </CommunityContext.Provider>
  )
}

export default CommunityProvider;