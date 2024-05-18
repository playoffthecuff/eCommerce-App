import { ConfigProvider, App as AntApp, Spin } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import lightTheme from './utils/themes';
import router from './utils/router';
import userStore, { BootState } from './store/user-store';

function App() {
  return (
    <ConfigProvider theme={lightTheme}>
      <Spin size="large" spinning={userStore.bootState === BootState.InProgress}>
        <AntApp className="app">
          <RouterProvider router={router} />
        </AntApp>
      </Spin>
    </ConfigProvider>
  );
}

const observableApp = observer(App);

export default observableApp;
