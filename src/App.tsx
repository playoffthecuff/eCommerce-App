import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './pages/root/Root';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Main from './pages/main/Main';
import ErrorPage from './pages/error-page/ErrorPage';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
