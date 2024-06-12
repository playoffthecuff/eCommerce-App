import styles from './OrderSaving.module.css';

function OrderSaving() {
  return (
    <>
      <div className={styles['order-saving-item']}>
        <p>Order Subtotal</p>
        <p>$35.00</p>
      </div>
      <div className={styles['order-saving-item']}>
        <p>Savings/Promo</p>
        <p>-$5.00</p>
      </div>
    </>
  );
}

export default OrderSaving;
