/* eslint-disable no-nested-ternary */
import { Typography, Layout, Menu, MenuProps, Switch } from 'antd';
import classNames from 'classnames';
import {
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  WalletOutlined,
  MoonFilled,
  SunFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { LogoIcon } from '../CustomIcons/CustomIcons';

import styles from './Header.module.css';
import userStore from '../../store/user-store';
import themeStore from '../../store/theme-store';
import { cartStore } from '../../store/cart-store';
import { CartIcon } from './components/CartIcon';

const { Title, Link } = Typography;
const { Header: AntHeader } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const paths = {
  '/catalog': 'SHOP',
  '/login': 'SIGN IN',
  '/registration': 'SIGN UP',
  '/about': 'ABOUT US',
  '/profile': 'PROFILE',
  '/logout': 'LOGOUT',
  '/cart': 'Cart',
  '/admin': 'ADMIN',
};

function Header() {
  const [currentMenuItem, setCurrentMenuItem] = useState('');
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [themeSwitch, setThemeSwitch] = useState(themeStore.theme === 'dark');
  useEffect(() => {
    if (isBurgerOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [isBurgerOpen]);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (Object.hasOwn(paths, path)) {
      setCurrentMenuItem(paths[location.pathname as keyof typeof paths]);
    } else {
      setCurrentMenuItem('');
    }
  }, [location.pathname]);
  const navigate = useNavigate();
  const menuItems: MenuItem[] = [
    {
      label: 'SHOP',
      key: 'SHOP',
      icon: <WalletOutlined />,
      onClick: () => {
        navigate('/catalog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      label: userStore.isAuthorized ? 'LOG OUT' : 'SIGN IN',
      key: userStore.isAuthorized ? 'LOG OUT' : 'SIGN IN',
      icon: userStore.isAuthorized ? <LogoutOutlined /> : <LoginOutlined />,
      onClick: userStore.isAuthorized
        ? () => {
            userStore.logout();
            navigate('/main');
            cartStore.createTempCart();
          }
        : () => navigate('/login'),
    },
    {
      label: userStore.user?.isRoot ? 'ADMIN' : userStore.isAuthorized ? 'PROFILE' : 'SIGN UP',
      key: userStore.user?.isRoot ? 'ADMIN' : userStore.isAuthorized ? 'PROFILE' : 'SIGN UP',
      icon: userStore.user?.isRoot ? <SettingOutlined /> : userStore.isAuthorized ? <UserOutlined /> : <FormOutlined />,
      onClick: userStore.user?.isRoot
        ? () => navigate('/admin')
        : userStore.isAuthorized
          ? () => navigate('/profile')
          : () => navigate('/registration'),
    },
    {
      label: 'ABOUT US',
      key: 'ABOUT US',
      icon: <TeamOutlined />,
      onClick: () => navigate('/about'),
    },
  ];

  const menuClick: MenuProps['onClick'] = () => {
    setBurgerOpen(false);
  };

  const burgerClick = () => {
    setBurgerOpen(!isBurgerOpen);
  };

  const changeTheme = (value: boolean) => {
    setThemeSwitch(value);
    if (value) {
      themeStore.setDark();
    } else {
      themeStore.setLight();
    }
  };

  return (
    <>
      <AntHeader className={styles.header}>
        <div className={styles['layout-container']}>
          <Link href="#/" onClick={() => setBurgerOpen(false)}>
            <div className={styles.logo}>
              <LogoIcon />
              <Title level={5}>Cycling Dependency</Title>
            </div>
          </Link>
          <div className={styles['burger-wrapper']} onClick={burgerClick}>
            <div className={classNames(styles.burgerButton, { [styles.active]: isBurgerOpen })} onClick={burgerClick} />
          </div>
          <Menu
            className={styles['burger-menu']}
            style={{ lineHeight: '2rem' }}
            mode="horizontal"
            items={menuItems}
            selectedKeys={[currentMenuItem]}
            onClick={menuClick}
          />
          <Menu
            className={styles.menu}
            style={{ lineHeight: '2rem' }}
            mode="horizontal"
            items={[
              {
                key: 'Cart',
                icon: <CartIcon />,
              },
            ]}
            selectedKeys={[currentMenuItem]}
            onClick={menuClick}
          />
          <Switch
            onChange={changeTheme}
            checked={themeSwitch}
            checkedChildren={<MoonFilled />}
            unCheckedChildren={<SunFilled />}
          />
        </div>
      </AntHeader>
      <Sider
        width="100%"
        className={classNames(styles.sider, { [styles.active]: isBurgerOpen })}
        style={{ position: 'fixed' }}
      >
        <Menu mode="inline" selectedKeys={[currentMenuItem]} onClick={menuClick} items={menuItems} />
      </Sider>
    </>
  );
}

const observableHeader = observer(Header);

export default observableHeader;
