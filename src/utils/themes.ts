import { ThemeConfig } from 'antd';

const lightTheme: ThemeConfig = {
  // cssVar: true,
  // hashed: false,
  token: {
    fontFamily: 'Haas',

    borderRadius: 0,
    controlHeight: 36,

    colorPrimary: '#2644ad', // cd4c1d
    colorPrimaryHover: '#111',
    colorError: '#ad4426', // cd4c1d
    colorSuccess: '#44ad26',
    colorLink: '#2644ad',
    colorLinkHover: '#5875da',
    linkDecoration: 'underline',
    linkHoverDecoration: 'underline',
    colorText: '#111',
    colorBgContainerDisabled: '#d3d3d3',
    colorTextDisabled: '#a9a9a9',
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
      itemColor: '#111',
      itemHoverColor: '#2644ad',
      itemPaddingInline: 12,
      horizontalItemSelectedColor: '#2644ad',
      fontFamily: 'Futura',
    },
    Layout: {
      headerBg: '#fff',
      bodyBg: '#fff',
      headerHeight: 48,
    },
  },
};

export default lightTheme;
