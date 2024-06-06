import { ConfigProvider, App as AntApp, Spin } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { lightTheme, darkTheme } from './utils/theme';
import router from './utils/router';
import userStore from './store/user-store';
import { BootState } from './types/boot-state';
import themeStore from './store/theme-store';

function App() {
  return (
    <ConfigProvider theme={themeStore.theme === 'dark' ? darkTheme : lightTheme}>
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
