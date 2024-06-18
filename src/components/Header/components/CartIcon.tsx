import { ShoppingOutlined } from '@ant-design/icons';
import { Spin, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartStore } from '../../../store/cart-store';
import styles from '../Header.module.css';
import { BootState } from '../../../enums';

const MAX_ITEMS_TO_SHOW = 9;

export const CartIcon = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    cartStore.loadItems();
  }, []);

  let count: ReactElement | string =
    cartStore.totalItems > MAX_ITEMS_TO_SHOW ? `${MAX_ITEMS_TO_SHOW}+` : String(cartStore.totalItems);
  if (count === '0') {
    count = '';
  }
  if (cartStore.cartState === BootState.InProgress) {
    count = <Spin size="small" />;
  }

  const icon = (
    <div
      style={{ position: 'relative' }}
      onClick={() => {
        navigate('/cart');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <ShoppingOutlined style={{ fontSize: '28px' }} />
      <div className={styles.badge}>{count}</div>
    </div>
  );

  if (cartStore.totalItems <= MAX_ITEMS_TO_SHOW) {
    return icon;
  }
  return <Tooltip title={`${cartStore.totalItems} items`}>{icon}</Tooltip>;
});
