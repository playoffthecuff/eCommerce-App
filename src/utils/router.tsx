import { createHashRouter } from 'react-router-dom';
import Root from '../pages/Root/Root';
import LoginPage from '../pages/Login/Login';
import RegistrationPage from '../pages/Registration/Registration';
import MainPage from '../pages/Main/Main';
import AboutPage from '../pages/About/About';
import CatalogPage from '../pages/Catalog/Catalog';
import ProfilePage from '../pages/Profile/Profile';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import DevPage from '../pages/Develop/Develop';
import ProductPage from '../pages/Product/Product';
// import AdminPage from '../pages/Admin/Admin';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/main',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
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
        path: '/not-found',
        element: <ErrorPage />,
      },
      {
        path: '/dev',
        element: <DevPage />,
      },
      {
        path: '/product',
        element: <ProductPage />,
      },
      // {
      //   path: '/admin',
      //   element: <AdminPage />,
      // },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
