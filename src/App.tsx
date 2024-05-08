import { RouterProvider, createHashRouter } from 'react-router-dom';

import routerConfig from './routes/routerConfig';

import './App.css';

const router = createHashRouter(routerConfig);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
