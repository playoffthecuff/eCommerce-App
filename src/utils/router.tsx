import { createHashRouter } from 'react-router-dom';
import Root from '../pages/Root/Root';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Main from '../pages/Main/Main';
import AboutPage from '../pages/About/About';
import CatalogPage from '../pages/Catalog/Catalog';
import ProfilePage from '../pages/Profile/Profile';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProductPage from '../pages/Product/Product';

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
        path: '/catalog',
        element: <CatalogPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/product',
        element: <ProductPage />,
      },
      {
        path: '/not-found',
        element: <ErrorPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
