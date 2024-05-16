// import { Link } from 'react-router-dom';
import { Typography, Layout, Menu, MenuProps, Space } from 'antd';
import { EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

// import HeaderMenu from '../HeaderMenu/HeaderMenu';

import styles from './Header.module.css';

const { Title, Link } = Typography;
const { Header: AntHeader } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
      },
      {
        type: 'group',
        label: 'Item 2',
      },
    ],
  },
  {
    key: 'alipay',
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

function Header() {
  // return (
  //   <header className={styles.header}>
  //     <Title>Cycles store</Title>

  //     <HeaderMenu />

  //     <div className={styles['link-wrapper']}>
  //       <Space>
  //         <Link className={styles['header-link']} href="#/registration">
  //           <EditTwoTone />
  //           Sign Up
  //         </Link>
  //       </Space>

  //       <Space>
  //         <Link className={styles['header-link']} href="#/login">
  //           <CheckCircleTwoTone />
  //           Sign In
  //         </Link>
  //       </Space>
  //     </div>
  //   </header>
  // );
  return (
    <AntHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <Title>Cycles store</Title>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
      <div className={styles['link-wrapper']}>
        <Space>
          <Link className={styles['header-link']} href="#/registration">
            <EditTwoTone />
            Sign Up
          </Link>
        </Space>

        <Space>
          <Link className={styles['header-link']} href="#/login">
            <CheckCircleTwoTone />
            Sign In
          </Link>
        </Space>
      </div>
    </AntHeader>
  );
}

export default Header;
