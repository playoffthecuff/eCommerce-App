import { ConfigProvider, App } from 'antd';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import routerConfig from './routes/routerConfig';

const router = createHashRouter(routerConfig);

function AppWrapper() {
  return (
    <App className="app">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#cd4c1d',
            colorPrimaryHover: '#111',
            borderRadius: 0,
            colorLink: '#cd4c1d',
            fontFamily: 'Haas',
            colorError: '#9f2d11',
            linkDecoration: 'underline',
            linkHoverDecoration: 'underline',
            colorLinkHover: '#9f2d11',
            controlHeight: 36,
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
        }}
      />
      <RouterProvider router={router} />
    </App>
  );
}

export default AppWrapper;
