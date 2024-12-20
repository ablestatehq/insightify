// import React, { useState, createContext, useEffect, useCallback } from 'react';
// import { getData } from '@api/grapiql';
// import { getMe } from '@api/strapiJSAPI';
// import { retrieveLocalData, storeToLocalStorage } from '@utils/localStorageFunctions';
// import ProductProvider from './ProductContext';
// import { createClientSocket } from '@src/lib/socket';
// import { Socket } from 'socket.io-client';

// interface AppContextProviderProps {
//   children: React.ReactNode;
// }

// interface AppContextType {
//   jwt: string;
//   setJwt: React.Dispatch<React.SetStateAction<string>>;
//   user: any;
//   setUser: React.Dispatch<React.SetStateAction<any>>;
//   xp: number;
//   setXp: React.Dispatch<React.SetStateAction<number>>;
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   codeTips: any[];
//   setCodeTips: React.Dispatch<React.SetStateAction<any[]>>;
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   opportunities: any[];
//   setOpportunities: React.Dispatch<React.SetStateAction<any[]>>;
//   isNotificationEnabled: boolean;
//   setIsNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   notifications: any[];
//   setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
//   comments: any[];
//   setComments: React.Dispatch<React.SetStateAction<any[]>>;
//   community: any[];
//   setCommunity: React.Dispatch<React.SetStateAction<any[]>>;
//   fetchAdditionalData: () => Promise<void>;
//   refreshData: () => Promise<void>;
// }

// export const AppContext = createContext<AppContextType>({
//   jwt: '',
//   setJwt: () => {},
//   user: {},
//   setUser: () => {},
//   xp: 0,
//   setXp: () => {},
//   isLoading: true,
//   setIsLoading: () => {},
//   codeTips: [],
//   setCodeTips: () => {},
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
//   opportunities: [],
//   setOpportunities: () => {},
//   isNotificationEnabled: false,
//   setIsNotificationEnabled: () => {},
//   notifications: [],
//   setNotifications: () => {},
//   comments: [],
//   setComments: () => {},
//   community: [],
//   setCommunity: () => {},
//   fetchAdditionalData: async () => {},
//   refreshData: async () => {},
// });

// const AppContextProvider = ({ children }: AppContextProviderProps) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<any>({});
//   const [xp, setXp] = useState<number>(0);
//   const [jwt, setJwt] = useState<string>('');
//   const [opportunities, setOpportunities] = useState<any[]>([]);
//   const [codeTips, setCodeTips] = useState<any[]>([]);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
//   const [comments, setComments] = useState<any[]>([]);
//   const [community, setCommunity] = useState<any[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   // Helper function to fetch data with fallback to cache

//   const setupSocket = useCallback(() => {
//     if (!jwt) return;
    
//     const clientSocket = createClientSocket(jwt);
//     setSocket(clientSocket);

//     clientSocket.on('connect', () => {
//       clientSocket.on('onlineUsers', (data) => {});
//     });

//     clientSocket.on('opportunity:create', ({ data }) => {
//       setOpportunities(prev => [...prev, data]);
//     });

//     return () => {
//       clientSocket.off('connect');
//       clientSocket.off('opportunity:create');
//       clientSocket.disconnect();
//     };
//   }, [jwt]);

//   const fetchInitialData = async () => {
//     try {
//       // Fetch user data first as it's critical
//       const userData = await getMe().catch(async () => {
//         const cachedUser = await retrieveLocalData('user');
//         return cachedUser ? { ok: true, data: cachedUser, jwt: await retrieveLocalData('jwt') } : { ok: false };
//       });

//       if (userData.ok) {
//         const cachedMembership = await retrieveLocalData('isMember');
//         setUser({
//           ...userData.data,
//           isMember: cachedMembership?.isMember ?? false,
//         });
//         setJwt(userData.jwt);
//         setXp(userData.data.totalXP ?? 0);
//         setIsLoggedIn(true);
//         storeToLocalStorage('user', userData.data);
//         storeToLocalStorage('jwt', userData.jwt);
//       }

//       // Load notification preferences
//       const notifySettings = await retrieveLocalData('tokens');
//       setIsNotificationEnabled(notifySettings?.isPushNotificationEnabled ?? false);

//       // Fetch main data with cache fallback
//       const [opportunities, techTips] = await Promise.all([
//         fetchWithCache('opportunities', () => getData('opportunities')),
//         fetchWithCache('techTips', () => getData('techTips')),
//       ]);

//       setOpportunities(opportunities);
//       setCodeTips(techTips);

//     } catch (error) {
//       console.error("Error in fetchInitialData:", error);
//       // Load cached data as fallback
//       const [
//         cachedOpportunities,
//         cachedTechTips,
//       ] = await Promise.all([
//         retrieveLocalData('opportunities'),
//         retrieveLocalData('techTips'),
//       ]);

//       setOpportunities(cachedOpportunities ?? []);
//       setCodeTips(cachedTechTips ?? []);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchAdditionalData = async () => {
//     try {
//       const [comments_, notifications_, community_] = await Promise.all([
//         fetchWithCache('comments', () => getData('comments')),
//         fetchWithCache('notifications', () => getData('sentNotifications')),
//         fetchWithCache('community', () => getData('communityMembers')),
//       ]);

//       setComments(prev => [...new Set([...prev, ...comments_])]);
//       setNotifications(prev => [...new Set([...prev, ...notifications_])]);
//       setCommunity(prev => [...new Set([...prev, ...community_])]);
//     } catch (error) {
//       console.error("Error fetching additional data:", error);
//     }
//   };

//   // Function to manually refresh data
//   const refreshData = async () => {
//     setIsLoading(true);
//     await fetchInitialData();
//     await fetchAdditionalData();
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     const cleanup = setupSocket();
//     return () => {
//       cleanup?.();
//     };
//   }, [setupSocket]);

//   const contextValue: AppContextType = {
//     user,
//     setUser,
//     jwt,
//     setJwt,
//     xp,
//     setXp,
//     isLoading,
//     setIsLoading,
//     codeTips,
//     setCodeTips,
//     isLoggedIn,
//     setIsLoggedIn,
//     opportunities,
//     setOpportunities,
//     isNotificationEnabled,
//     setIsNotificationEnabled,
//     notifications,
//     setNotifications,
//     comments,
//     setComments,
//     community,
//     setCommunity,
//     fetchAdditionalData,
//     refreshData,
//   };

//   return (
//     <ProductProvider>
//       <AppContext.Provider value={contextValue}>
//         {children}
//       </AppContext.Provider>
//     </ProductProvider>
//   );
// };

// export default AppContextProvider;