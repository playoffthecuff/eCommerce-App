import { cartStore } from '../../../../store/cart-store';

import styles from './OrderSaving.module.css';

function OrderSaving() {
  return (
    <>
      <div className={styles['order-saving-item']}>
        <p>Order Subtotal</p>
        <p>${cartStore.totalPrice}</p>
      </div>
      <div className={styles['order-saving-item']}>
        <p>Savings/Promo</p>
        <p>-$5.00</p>
      </div>
    </>
  );
}

export default OrderSaving;
