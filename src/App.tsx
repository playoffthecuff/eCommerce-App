import { ConfigProvider, App as AntApp, Spin } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import lightTheme from './utils/themes';
import router from './utils/router';
import userStore from './store/user-store';

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <ConfigProvider theme={lightTheme}>
      <Spin size="large" spinning={userStore.isLoading}>
        <AntApp className="app">
          <RouterProvider router={router} />
        </AntApp>
      </Spin>
    </ConfigProvider>
  );
}

const observableApp = observer(App);

export default observableApp;
