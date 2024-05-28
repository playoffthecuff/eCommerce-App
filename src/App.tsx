import { ConfigProvider, App as AntApp, Spin, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import customTheme from './utils/theme';
import router from './utils/router';
import userStore from './store/user-store';
import { BootState } from './types/boot-state';
import themeStore from './store/theme-store';

function App() {
  return (
    <ConfigProvider
      theme={{
        ...customTheme,
        algorithm: themeStore.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Spin size="large" spinning={userStore.bootState === BootState.InProgress}>
        <AntApp className="app">
          {themeStore.theme}
          <RouterProvider router={router} />
        </AntApp>
      </Spin>
    </ConfigProvider>
  );
}

const observableApp = observer(App);

export default observableApp;
