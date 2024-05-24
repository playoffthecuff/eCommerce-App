import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const { Content } = Layout;

function Root() {
  return (
    <Layout style={{ overflow: 'hidden' }}>
      <Header />
      <Content style={{ width: '100%' }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}

export default Root;
