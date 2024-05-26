import { Layout, Menu } from 'antd';

import { useEffect, useState } from 'react';
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
// import { productsStore } from '../../store/product-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';

const { Sider } = Layout;

export default observer(function FiltersBlock() {
  const [collapsed, setCollapsed] = useState(true);

  const handleMenuClick = ({ key }: { key: string }) => {
    let category = '';
    switch (key) {
      case '1':
        category = '9999';
        break;
      case '2':
        category = '99999';
        break;
      case '3':
        category = '999999';
        break;
      default:
        category = '';
    }
    // productsStore.selectedCategory = category;
    console.log(category);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
    document.body.style.overflow = collapsed ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setCollapsed(true);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on component unmount
    };
  }, []);

  return (
    <div className={styles['filters-block-wrapper']}>
      <div className={`${styles.overlay} ${collapsed ? styles.hidden : ''}`} onClick={closeMenu} />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width="40%"
        style={{ left: collapsed ? '-100%' : '0', position: 'fixed', height: '100vh', top: '48px' }}
      >
        <div className="demo-logo-vertical" />
        <div className={styles['close-button']} onClick={closeMenu}>
          <CloseOutlined />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '9999',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '99999',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '999999',
            },
          ]}
        />
      </Sider>

      <CustomButton
        style={{ width: '100px' }}
        variety="filters"
        htmlType="button"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleMenu}
      >
        Filters
      </CustomButton>
    </div>
  );
});
