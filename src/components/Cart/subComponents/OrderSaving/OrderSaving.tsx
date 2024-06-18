import { observer } from 'mobx-react-lite';
import { cartStore } from '../../../../store/cart-store';

import styles from './OrderSaving.module.css';
import { formatMoney } from '../../../../utils/format-money';

export default observer(function OrderSaving() {
  return (
    <>
      <div className={styles['order-saving-item']}>
        <p>Order Subtotal</p>
        <p>{formatMoney(cartStore.totalPrice + cartStore.totalDiscount + cartStore.totalPromoDiscount)}</p>
      </div>
      <div className={styles['order-saving-item']}>
        <p>Savings</p>
        <p>{formatMoney(-cartStore.totalDiscount)}</p>
      </div>
      <div className={styles['order-saving-item']}>
        <p>Promo</p>
        <p>
          {cartStore.totalPromoDiscount > 0
            ? formatMoney(-cartStore.totalPromoDiscount)
            : formatMoney(cartStore.totalPromoDiscount)}
        </p>
      </div>
    </>
  );
});
