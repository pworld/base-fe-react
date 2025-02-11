import { ThemeConfig } from 'antd';

// Define theme names
export type ThemeNames = 'light' | 'dark' | 'Blue' | 'Purple' | 'Magenta' | 'Red' | 'Orange' | 'Yellow' | 'Green';

// Record type for RefineThemes
type RefineThemes = Record<ThemeNames, ThemeConfig>;

// RefineThemes definition with primary colors
export const refineThemes: RefineThemes = {
  light: { token: { colorPrimary: '#1677FF' } },
  dark: { token: { colorPrimary: '#000000' } },
  Blue: { token: { colorPrimary: '#1677FF' } },
  Purple: { token: { colorPrimary: '#722ED1' } },
  Magenta: { token: { colorPrimary: '#EB2F96' } },
  Red: { token: { colorPrimary: '#F5222D' } },
  Orange: { token: { colorPrimary: '#FA541C' } },
  Yellow: { token: { colorPrimary: '#FAAD14' } },
  Green: { token: { colorPrimary: '#52C41A' } },
};

// ThemeConfig with extended configurations
export const themeConfig: ThemeConfig = {
  token: {
    colorPrimaryText: 'rgba(0, 0, 0, 0.85)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorPrimary: '#1677ff',
    colorBgContainer: '#F7F8F9',
    colorBgLayout: '#F0F2F5',
    colorBorderBg: '#E8E9EA',
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    Typography: {
      colorText: 'rgba(0, 0, 0, 0.85)',
      colorTextDescription: 'rgba(0, 0, 0, 0.65)',
      colorTextDisabled: 'rgba(0, 0, 0, 0.45)',
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      headerBg: '#FAFAFA',
      boxShadowTertiary: '0px 1px 2px 0px #00000008,0px 1px 6px -1px #000000050px,2px 4px 0px #00000005',
    },
    Table: {
      colorBgContainer: '#fff',
    },
    Input: {
      colorBgContainer: '#fff',
    },
    InputNumber: {
      colorBgContainer: '#fff',
    },
    Calendar: {
      colorBgContainer: '#FFFFFF',
    },
    Radio: {
      colorBgContainer: '#fff',
    },
    Select: {
      colorBgContainer: '#fff',
    },
  },
};

// Function to apply a selected theme from RefineThemes to the themeConfig
export const applyTheme = (themeName: ThemeNames): ThemeConfig => {
  const selectedTheme = refineThemes[themeName];
  return {
    ...themeConfig,
    token: {
      ...themeConfig.token,
      ...selectedTheme.token,
    },
  };
};
