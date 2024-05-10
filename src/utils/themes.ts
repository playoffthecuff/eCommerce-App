import { ThemeConfig } from 'antd';

const lightTheme: ThemeConfig = {
  // cssVar: true,
  // hashed: false,
  token: {
    fontFamily: 'Haas',

    borderRadius: 0,
    controlHeight: 36,

    colorPrimary: '#cd4c1d',
    colorPrimaryHover: '#111',
    colorError: '#cd4c1d',
    colorLink: '#9f2d11',
    colorLinkHover: '#cd4c1d',

    linkDecoration: 'underline',
    linkHoverDecoration: 'underline',
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
