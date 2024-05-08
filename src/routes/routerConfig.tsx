import Root from '../pages/root/Root';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';
import Main from '../pages/main/Main';
import ErrorPage from '../pages/error-page/ErrorPage';

const routerConfig = [
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
    ],
  },
];

export default routerConfig;
