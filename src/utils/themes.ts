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
    colorLink: '#112d9f',
    colorLinkHover: '#1d4ccd',
    colorSuccess: '#44ad26',
    linkDecoration: 'underline',
    linkHoverDecoration: 'underline',
    colorText: '#111',
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
  },
};

export default lightTheme;
