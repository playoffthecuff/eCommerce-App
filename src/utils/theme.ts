import { ThemeConfig } from 'antd';

export type Theme = 'light' | 'dark';

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const customTheme: ThemeConfig = {
  // cssVar: true,
  // hashed: false,
  token: {
    fontFamily: 'Haas',

    borderRadius: 0,
    controlHeight: 36,

    colorPrimary: '#2644ad',
    colorPrimaryHover: '#111',
    colorError: '#ad4426',
    colorSuccess: '#44ad26',
    colorLink: '#2644ad',
    colorLinkHover: '#5875da',
    linkDecoration: 'underline',
    linkHoverDecoration: 'underline',
    colorText: 'var(--color-text)',
    colorBgContainerDisabled: 'var(--color-bg-container-disabled)',
    colorTextDisabled: 'var(--color-button-disabled-text)',
  },
  components: {
    Button: {
      fontFamily: 'Futura',
      fontWeight: 'bold',
      primaryShadow: 'none',
      defaultBg: 'var(--color-primary)',
      defaultHoverBg: 'var(--color-button-background)',
      defaultColor: 'var(--color-button-text)',
      defaultHoverColor: 'var(--color-button-hover-text)',
      defaultActiveColor: 'var(--color-button-active-text)',
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
      colorBgContainer: 'var(--color-menu-background)',
    },
    Layout: {
      headerBg: 'var(--color-header-background)',
      bodyBg: 'var(--color-background)',
      headerHeight: 48,
      footerBg: 'var(--color-footer-background)',
    },
  },
};

export default customTheme;
