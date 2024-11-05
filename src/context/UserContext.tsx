// contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '@api/strapiJSAPI';

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
  xp: number,
  setXP: React.Dispatch<React.SetStateAction<number>>,
  community: any[],
  setCommunity: React.Dispatch<React.SetStateAction<any[]>>,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string>('');
  const [xp, setXP] = useState<number>(0);
  const [community, setCommunity] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getMe();
      if (userData.ok) {
        setUser(userData.data);
        setJwt(userData.jwt);
        setIsLoggedIn(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, jwt, setJwt, xp, setXP, community, setCommunity }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("useUser must be used within a UserProvider");
  return context;
};
