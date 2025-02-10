import React, { createContext } from 'react';
import { notification as AntdNotification } from 'antd';
import { IconType, NotificationInstance } from 'antd/es/notification/interface';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface NotificationType {
  type?: IconType;
  message: string;
  description?: string;
  key?: React.Key;
}
interface GlobalContextContainerProps {}

interface GlobalConfig {
  notification: (props: NotificationType) => void;
  notificationApi: NotificationInstance;
}

export const GlobalContext = createContext<GlobalConfig | undefined>(undefined);

const GlobalContextContainer = ({
  children,
}: React.PropsWithChildren<GlobalContextContainerProps>): React.ReactElement => {
  const [notificationApi, contextHolder] = AntdNotification.useNotification();

  const notification = ({
    type = 'success',
    message,
    description,
    key,
  }: NotificationType) => {
    notificationApi[type]({
      message,
      description,
      key,
    });
  };

  const value = {
    notification,
    notificationApi,
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError: true,
      },
      mutations: {
        throwOnError: false,
        onError: (error) => {
          console.error(error);
        },
      },
    },
  });

  return (
    <GlobalContext.Provider value={value}>
      {contextHolder}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'GlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export default GlobalContextContainer;
