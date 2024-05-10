import { ConfigProvider, App as AntApp } from 'antd';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import lightTheme from './utils/themes';

import routerConfig from './routes/routerConfig';

const router = createHashRouter(routerConfig);

function App() {
  return (
    <ConfigProvider theme={lightTheme}>
      <AntApp className="app">
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
