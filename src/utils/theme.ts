import { ThemeConfig, theme } from 'antd';

const { darkAlgorithm } = theme;

export type Theme = 'light' | 'dark';

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const noVarTokenLight = {
  colorPrimary: '#541388',
  colorPrimaryHover: '#111',
  colorError: '#B42200',
  colorSuccess: '#22B400',
  colorLink: '#541388',
  colorLinkHover: '#966cad',
};

const noVarTokenDark = {
  colorPrimary: '#966cad',
  colorPrimaryHover: '#999EB0',
  colorError: '#F62F00',
  colorSuccess: '#2ADE00',
  colorLink: '#966cad',
  colorLinkHover: '#78508F',
};

export const lightTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    ...noVarTokenLight,

    fontFamily: 'Haas, sans-serif',

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
      fontFamily: 'Futura, sans-serif',
      fontWeight: 'bold',
      primaryShadow: 'none',
    },
    Form: {
      itemMarginBottom: 28,
      verticalLabelPadding: 0,
    },
    Input: {
      hoverBorderColor: 'var(--color-border-hover)',
    },
    Menu: {
      itemColor: 'var(--color-menu-item-text)',
      itemHoverColor: 'var(--color-menu-item-hover)',
      itemPaddingInline: 12,
      horizontalItemSelectedColor: 'var(--color-menu-item-selected)',
      fontFamily: 'Futura, sans-serif',
      colorBgContainer: 'transparent',
    },
    Layout: {
      headerBg: 'var(--color-header-background)',
      bodyBg: 'var(--color-background)',
      headerHeight: 48,
      footerBg: 'var(--color-footer-background)',
      siderBg: 'red',
    },
    Descriptions: {
      labelBg: 'transparent',
      titleColor: 'var(--color-text)',
      titleMarginBottom: 0,
    },
    Table: {
      headerBg: 'var(--color-background-secondary)',
      borderColor: 'var(--color-background-secondary)',
      rowHoverBg: 'var(--color-background-secondary)',
    },
    Collapse: {
      headerBg: 'transparent',
      headerPadding: '0.5rem',
      contentPadding: '0.5rem 1rem 1rem 1.25rem',
    },
    List: {
      itemPaddingLG: '0px',
      itemPaddingSM: '0px',
      itemPadding: '0px',
    },
    Carousel: {
      dotOffset: 30,
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  algorithm: darkAlgorithm,
};

darkTheme.token = { ...darkTheme.token, ...noVarTokenDark };
