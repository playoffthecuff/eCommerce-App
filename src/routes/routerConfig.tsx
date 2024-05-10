import Root from '../pages/Root/Root';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Main from '../pages/Main/Main';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

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
