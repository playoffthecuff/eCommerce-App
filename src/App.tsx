import { ConfigProvider, App as AntApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { lightTheme, darkTheme } from './utils/theme';
import router from './utils/router';
import themeStore from './store/theme-store';

function App() {
  return (
    <ConfigProvider theme={themeStore.theme === 'dark' ? darkTheme : lightTheme}>
      <AntApp className="app">
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
}

const observableApp = observer(App);

export default observableApp;
