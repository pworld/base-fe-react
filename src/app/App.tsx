import { Refine } from '@refinedev/core';
import React from 'react';

import { useNotificationProvider } from '@refinedev/antd';

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6';

import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { resources } from '@/config/resources';
import { ConfigProvider } from '@/context';
import { BaseContextProvider } from '@/context/base-list-context';
import { BaseModalProvider } from '@/context/base-modal/base-modal-provider';
import { accessControlProvider } from '@/providers/accessControlProvider';
import { authProvider } from '@/providers/authProvider';
import { RefineKbarProvider } from '@refinedev/kbar';
import { AppRouter } from './router';
import store from './store';
import customDataProvider from '@/providers/customDataProvider';
import { axiosInstance } from '@/utility/rest/axios';

import './global.scss';
import mockDataProvider from '@/providers/mockDataProvider';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const driverApiUrl = import.meta.env.VITE_API_BASE_DRIVER_URL;

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const notif = useNotificationProvider();

  /*
   * Use customDataProvider to integrate with HTTP REST API: customDataProvider(apiUrl, axiosInstance, notif.open);
   * Use mockDataProvider to simulate integrate with HTTP REST API using data from mocks folder: mockDataProvider(apiUrl, axiosInstance, notif.open);
   */
  const dataProvider = customDataProvider(apiUrl, axiosInstance, notif.open);
  const driverDataProvider = customDataProvider(driverApiUrl, axiosInstance, notif.open);

  const i18nProvider = {
    translate: (key: string, params?: TOptions) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider>
          <BaseContextProvider>
            <RefineKbarProvider>
              <Refine
                authProvider={authProvider}
                dataProvider={{
                  default: dataProvider,
                  driver: driverDataProvider,
                }}
                routerProvider={routerProvider}
                resources={resources}
                accessControlProvider={accessControlProvider}
                // notificationProvider={notif}
                i18nProvider={i18nProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: false,
                }}
              >
                <BaseModalProvider>
                  <AppRouter />
                </BaseModalProvider>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </RefineKbarProvider>
          </BaseContextProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
