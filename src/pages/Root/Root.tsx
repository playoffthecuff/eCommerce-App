import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const { Content } = Layout;

function Root() {
  return (
    <Layout style={{ overflow: 'hidden' }}>
      <Header />
      <Content style={{ width: '100%' }}>
        <Breadcrumbs />
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default Root;
