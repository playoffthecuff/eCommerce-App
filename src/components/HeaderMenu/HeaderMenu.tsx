// import { useState } from 'react';

import { MenuProps, Menu } from 'antd';
import styles from './HeaderMenu.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'shop',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        Shop
      </a>
    ),
  },
  {
    key: 'outlet',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        Outlet
      </a>
    ),
  },
  {
    key: 'about us',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        About Us
      </a>
    ),
  },
];

function HeaderMenu() {
  // const [current, setCurrent] = useState('single speed');

  // const onClick: MenuProps['onClick'] = (event) => {
  //   // console.log('click ', event);
  //   setCurrent(event.key);
  // };

  // return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;

  return <Menu mode="horizontal" items={items} className={styles['header-menu']} />;
}

export default HeaderMenu;
