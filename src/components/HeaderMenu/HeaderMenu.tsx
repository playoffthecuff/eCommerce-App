// import { useState } from 'react';

import { MenuProps, Menu } from 'antd';
import styles from './HeaderMenu.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'single speed',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        Single Speed
      </a>
    ),
  },
  {
    key: 'city bikes',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        City Bikes
      </a>
    ),
  },
  {
    key: 'commuter bikes',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        Commuter Bikes
      </a>
    ),
  },
  {
    key: 'gravel bikes',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        Gravel Bikes
      </a>
    ),
  },
  {
    key: 'all bikes',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        All Bikes
      </a>
    ),
  },
  {
    key: 'accessories',
    label: (
      <a href="#/main" target="_blank" rel="noopener noreferrer">
        Accessories
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
