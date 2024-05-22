/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography, Layout, Menu, MenuProps, Switch } from 'antd';
import {
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { LogoIcon } from '../CustomIcons/CustomIcons';

import styles from './Header.module.css';
import userStore from '../../store/user-store';

const { Title, Link } = Typography;
const { Header: AntHeader } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const paths = {
  shop: 'SHOP',
  login: 'SIGN IN',
  registration: 'SIGN UP',
  about: 'ABOUT US',
  profile: 'PROFILE',
  logout: 'LOGOUT',
};

function Header() {
  const [current, setCurrent] = useState('');
  const [siderState, setSiderState] = useState(styles.sider);
  const [burgerState, setBurgerState] = useState(styles['burger-button']);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      setSiderState(`${styles.sider} ${styles.active}`);
      setBurgerState(`${styles['burger-button']} ${styles.active}`);
    } else {
      document.body.classList.remove('no-scroll');
      setSiderState(styles.sider);
      setBurgerState(styles['burger-button']);
    }
  }, [isOpen]);
  const navigate = useNavigate();
  const path = window.location.hash.slice(2) as keyof typeof paths;
  useEffect(() => {
    setCurrent(paths[path]);
  }, [path]);
  const menuItems: MenuItem[] = [
    {
      label: 'SHOP',
      key: 'SHOP',
      icon: <WalletOutlined />,
      onClick: () => {
        navigate('/catalog');
      },
    },
    {
      label: userStore.isAuthorized ? 'LOG OUT' : 'SIGN IN',
      key: userStore.isAuthorized ? 'LOG OUT' : 'SIGN IN',
      icon: userStore.isAuthorized ? <LogoutOutlined /> : <LoginOutlined />,
      onClick: userStore.isAuthorized
        ? () => {
            userStore.logout();
          }
        : () => {
            navigate('/login');
          },
    },
    {
      label: userStore.isAuthorized ? 'PROFILE' : 'SIGN UP',
      key: userStore.isAuthorized ? 'PROFILE' : 'SIGN UP',
      icon: userStore.isAuthorized ? <UserOutlined /> : <FormOutlined />,
      onClick: userStore.isAuthorized
        ? () => {
            navigate('/profile');
          }
        : () => {
            navigate('/registration');
          },
    },
    {
      label: 'ABOUT US',
      key: 'ABOUT US',
      icon: <TeamOutlined />,
      onClick: () => {
        navigate('/about');
      },
    },
  ];

  const menuClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    setIsOpen(false);
  };

  const burgerClick = () => {
    setIsOpen(!isOpen);
  };

  const changeTheme = (value: boolean) => {
    return value;
  };

  return (
    <AntHeader className={styles.header}>
      <div className={styles['layout-container']}>
        <Link href="#/">
          <div className={styles.logo}>
            <LogoIcon />
            <Title level={5}>Cycling Dependency</Title>
          </div>
        </Link>
        <div className={styles['burger-wrapper']} onClick={burgerClick}>
          <div className={styles['burger-button-wrapper']}>
            <div className={burgerState} />
          </div>
        </div>
        <Menu
          className={styles['burger-menu']}
          style={{ lineHeight: '2rem' }}
          mode="horizontal"
          items={menuItems}
          selectedKeys={[current]}
          onClick={menuClick}
        />
        <Menu
          className={styles.menu}
          style={{ lineHeight: '2rem' }}
          mode="horizontal"
          items={[
            {
              key: 'Cart',
              icon: <ShoppingCartOutlined style={{ fontSize: '24px' }} />,
            },
          ]}
          selectedKeys={[current]}
          onClick={menuClick}
        />
        <Switch onChange={changeTheme} checkedChildren="Dark" unCheckedChildren="Light" />
      </div>
      <Sider width="100%" className={siderState} style={{ position: 'fixed' }}>
        <Menu mode="inline" selectedKeys={[current]} onClick={menuClick} items={menuItems} />
      </Sider>
    </AntHeader>
  );
}

const observableHeader = observer(Header);

export default observableHeader;
