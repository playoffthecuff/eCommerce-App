import { ThemeConfig, theme } from 'antd';

const { darkAlgorithm } = theme;

export type Theme = 'light' | 'dark';

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const noVarTokenLight = {
  colorPrimary: '#2644ad',
  colorPrimaryHover: '#111',
  colorError: '#ad4426',
  colorSuccess: '#44ad26',
  colorLink: '#2644ad',
  colorLinkHover: '#5875da',
};

const noVarTokenDark = {
  colorPrimary: '#5875da',
  colorPrimaryHover: '#ddd',
  colorError: '#df856c',
  colorSuccess: '#85df6c',
  colorLink: '#5875da',
  colorLinkHover: '#2644ad',
};

const lightTheme: ThemeConfig = {
  // cssVar: true,
  // hashed: false,
  token: {
    ...noVarTokenLight,

    fontFamily: 'Haas',

    borderRadius: 0,
    controlHeight: 36,

    linkDecoration: 'underline',
    linkHoverDecoration: 'underline',
    colorText: 'var(--color-text)',
    colorBgContainerDisabled: 'var(--color-bg-container-disabled)',
    colorTextDisabled: 'var(--color-button-disabled-text)',
    // colorBorder: 'var(--color-border)',
    colorSplit: 'var(--color-border)',
  },
  components: {
    Button: {
      fontFamily: 'Futura',
      fontWeight: 'bold',
      primaryShadow: 'none',
    },
    Form: {
      itemMarginBottom: 28,
      verticalLabelPadding: 0,
    },
    Menu: {
      itemColor: 'var(--color-menu-item-text)',
      itemHoverColor: 'var(--color-menu-item-hover)',
      itemPaddingInline: 12,
      horizontalItemSelectedColor: 'var(--color-menu-item-selected)',
      fontFamily: 'Futura',
      colorBgContainer: 'transparent',
    },
    Layout: {
      headerBg: 'var(--color-header-background)',
      bodyBg: 'var(--color-background)',
      headerHeight: 48,
      footerBg: 'var(--color-footer-background)',
    },
    Descriptions: {
      labelBg: 'transparent',
      titleColor: 'var(--color-text)',
      titleMarginBottom: 0,
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  algorithm: darkAlgorithm,
};

darkTheme.token = { ...darkTheme.token, ...noVarTokenDark };

export default lightTheme;
