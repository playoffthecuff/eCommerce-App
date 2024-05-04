import { Outlet } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Root() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Root;
