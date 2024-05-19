import { createHashRouter, Navigate } from 'react-router-dom';
import Root from '../pages/Root/Root';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
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
      {
        path: '/not-found',
        element: <ErrorPage />,
      },
      {
        path: '*',
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);

export default router;
