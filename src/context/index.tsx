import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { ConfigProvider as AntdConfigProvider, theme, ThemeConfig } from "antd";
import { refineThemes, ThemeNames, applyTheme } from '@/config/theme';

type ConfigProviderContext = {
  mode: ThemeNames;
  setMode: (mode: ThemeNames) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderContext | undefined>(undefined);

// Lazy initializer function for mode
const initializeMode = (): ThemeNames => {
  // Placeholder for complex initialization logic
  // For example, checking user's preference in local storage or an API call
  return 'light';
};

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<ThemeNames>(initializeMode);

  // Function to select theme based on mode
  const selectTheme = (): ThemeConfig => {

    // IMPORTANT: For Custom Template:
    let themeConfigs = applyTheme('light');
    if (mode === 'dark') {
      themeConfigs = refineThemes.dark;
    }

    return themeConfigs;
    // return { algorithm: mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm };
  };

  return (
    <ConfigProviderContext.Provider value={{ mode, setMode }}>
      <AntdConfigProvider
        theme={selectTheme()}
      >
        {children}
      </AntdConfigProvider>
    </ConfigProviderContext.Provider>
  );
};

export const useConfigProvider = () => {
  const context = useContext(ConfigProviderContext);

  if (context === undefined) {
    throw new Error("useConfigProvider must be used within a ConfigProvider");
  }

  return context;
};
