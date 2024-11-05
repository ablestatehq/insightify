import React, { createContext, useState, useEffect } from 'react';
import { retrieveLocalData } from '@utils/localStorageFunctions';

interface NotificationContextType {
  isNotificationEnabled: boolean;
  setIsNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  loadNotifications: () => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextType>({
  isNotificationEnabled: false,
  setIsNotificationEnabled: () => { },
  notifications: [],
  setNotifications: () => { },
  loadNotifications: async () => { },
});

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const localNotification = await retrieveLocalData('notifications');
      setNotifications(localNotification || []);

      const isNofityOn = await retrieveLocalData('tokens');
      if (isNofityOn) {
        setIsNotificationEnabled(isNofityOn.isPushNotificationEnabled);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        isNotificationEnabled,
        setIsNotificationEnabled,
        notifications,
        setNotifications,
        loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
