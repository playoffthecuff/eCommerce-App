import { Spin, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import styles from './Cart.module.css';
import OrderSaving from './subComponents/OrderSaving/OrderSaving';
import CartItem from './subComponents/ProductItem/CartItem';
import OrderSummary from './subComponents/OrderSummary/OrderSummary';
import userStore from '../../store/user-store';
import { cartStore } from '../../store/cart-store';
import { BootState } from '../../types/boot-state';

export default observer(function Cart() {
  useEffect(() => {
    const currentUser = userStore.user?.id;
    const tempCartId = localStorage.getItem('temp_cart_id');

    if (currentUser || tempCartId) {
      cartStore.loadItems();
    }
  }, []);

  return (
    <div className={styles['cart-container']}>
      <Typography.Title level={3}>SHOPPING BAG</Typography.Title>
      <Spin spinning={cartStore.cartState === BootState.InProgress}>
        <div className={styles['cart-section']}>
          <div className={styles['product-container']}>
            <ul className={styles['product-list']}>
              {cartStore.items.map((item) => {
                return <CartItem key={item.productId} item={item} />;
              })}
            </ul>
            <div className={styles['order-saving-under']}>
              <OrderSaving />
            </div>
            <div className={styles['estimated-total-under']}>
              <p>Total</p>
              <p>${cartStore.totalPrice}</p>
            </div>
          </div>
          <OrderSummary />
        </div>
      </Spin>
    </div>
  );
});
