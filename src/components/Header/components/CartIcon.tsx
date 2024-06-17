import { ShoppingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartStore } from '../../../store/cart-store';
import styles from '../Header.module.css';
import { BootState } from '../../../enums';

export const CartIcon = observer(() => {
  const navigate = useNavigate();
  let count: ReactElement | string = cartStore.totalItems > 9 ? '9+' : String(cartStore.totalItems);
  if (count === '0') {
    count = '';
  }
  if (cartStore.cartState === BootState.InProgress) {
    count = <Spin size="small" />;
  }

  return (
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
});
