import { Popconfirm, Spin, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './Cart.module.css';
import OrderSaving from './subComponents/OrderSaving/OrderSaving';
import CartItem from './subComponents/CartItem/CartItem';
import OrderSummary from './subComponents/OrderSummary/OrderSummary';
import { cartStore } from '../../store/cart-store';
import { BootState } from '../../types/boot-state';
import emptyCart from '../../assets/images/empty-cart.svg';
import CustomButton from '../CustomButton/CustomButton';
import { formatMoney } from '../../utils/format-money';

export default observer(function Cart() {
  useEffect(() => {
    cartStore.loadItems();
  }, []);

  if (cartStore.items.length === 0) {
    return (
      <div className={styles['empty-cart']}>
        <img style={{ width: '200px', height: '200px' }} src={emptyCart} alt="Empty Cart" />
        <h2 style={{ fontSize: '2rem', marginBottom: 0 }}>Your cart is empty!</h2>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Start your shopping adventure now! Explore our <Link to="/catalog">catalog!</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles['cart-container']}>
      <Typography.Title level={3}>SHOPPING CART</Typography.Title>
      <Spin spinning={cartStore.cartState === BootState.InProgress}>
        <div className={styles['cart-section']}>
          <div className={styles['product-container']}>
            <ul className={styles['product-list']}>
              {cartStore.items.map((item) => {
                return <CartItem key={`${item.productId}_${item.size}`} item={item} />;
              })}
            </ul>
            <Popconfirm
              title="Clear the cart"
              description="Are you sure to delete all items?"
              onConfirm={async () => {
                cartStore.clearCart();
              }}
              icon={<QuestionCircleOutlined style={{ color: 'blue' }} />}
              okText="Yes"
              cancelText="No"
            >
              <CustomButton variety="common">CLEAR CART</CustomButton>
            </Popconfirm>
            <div className={styles['order-saving-under']}>
              <OrderSaving />
            </div>
            <div className={styles['estimated-total-under']}>
              <p>Total</p>
              <p>{formatMoney(cartStore.totalPrice)}</p>
            </div>
          </div>
          <OrderSummary />
        </div>
      </Spin>
    </div>
  );
});
