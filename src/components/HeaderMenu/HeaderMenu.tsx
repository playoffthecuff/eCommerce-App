import { useState } from 'react';

import { MenuProps, Menu } from 'antd';
import styles from './HeaderMenu.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: 'setting:3' },
          { label: 'Option 4', key: 'setting:4' },
        ],
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

function HeaderMenu() {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (event) => {
    // console.log('click ', event);
    setCurrent(event.key);
  };

  return (
    <Menu
      className={styles['header-menu']}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default HeaderMenu;
