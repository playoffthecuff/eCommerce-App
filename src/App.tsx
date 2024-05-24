import { ConfigProvider, App as AntApp, Spin } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import theme from './utils/theme';
import router from './utils/router';
import userStore from './store/user-store';
import { BootState } from './types/boot-state';

function App() {
  return (
    <ConfigProvider theme={theme}>
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
