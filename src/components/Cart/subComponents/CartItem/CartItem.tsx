import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { observer } from 'mobx-react-lite';
import styles from './CartItem.module.css';
import { ButtonVariety, CartItem as CartItemData } from '../../../../types/types';
import CustomButton from '../../../CustomButton/CustomButton';

import placeholder from '../../../../assets/images/load_failed.webp';
import { cartStore } from '../../../../store/cart-store';
import { formatMoney } from '../../../../utils/format-money';

type CartItemProps = {
  item: CartItemData;
};

export default observer(function CartItem({ item }: CartItemProps) {
  const { price, thumbs, discountedPrice, title, vendorCode, size, quantity, productId } = item;

  const handleItemDelete = async () => {
    await cartStore.removeFromCart(productId, size);
  };

  const handleIncrement = async () => {
    await cartStore.updateItemQuantity({
      productId,
      quantity: 1,
      size,
    });
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      await cartStore.updateItemQuantity({
        productId,
        quantity: -1,
        size,
      });
    } else {
      handleItemDelete();
    }
  };

  return (
    <li className={styles['product-card']}>
      <div className={styles['product-header']}>
        <div>
          <a href={`${import.meta.env.BASE_URL}#/product?vc=${vendorCode}`} className={styles['cart-item-link']}>
            <Typography.Title style={{ margin: 0 }} level={4}>
              {title}
            </Typography.Title>
          </a>
        </div>
        <div className={styles.cross}>
          <CloseOutlined onClick={handleItemDelete} />
        </div>
      </div>
      <div className={styles['product-main-box']}>
        <div className={styles['product-box']}>
          <div className={styles['product-img']}>
            <img src={thumbs ? `data:image/jpeg;base64,${thumbs}` : placeholder} alt={title} />
          </div>

          <div className={styles['product-prop']}>
            <Typography.Paragraph className={styles['vendor-code']} copyable>
              #{vendorCode}
            </Typography.Paragraph>
            {discountedPrice ? (
              <p style={{ display: 'flex' }}>
                Price:{' '}
                <span style={{ textDecorationLine: 'line-through', margin: '0 0.2rem' }}>{formatMoney(price)}</span>
                {formatMoney(discountedPrice)}
              </p>
            ) : (
              <p style={{ display: 'flex' }}>Price: {formatMoney(price)}</p>
            )}
            <p>Size: {size}</p>
          </div>
        </div>

        <div className={styles['product-setting-box']}>
          <div className={styles['counter-box']}>
            <div className={styles['product-counter']}>
              <CustomButton
                style={{ width: '40px' }}
                variety={ButtonVariety.FILTERS}
                onClick={handleDecrement}
                disabled={quantity === 1}
              >
                <MinusOutlined />
              </CustomButton>
              <div className={styles.quantity}>{quantity}</div>
              <CustomButton style={{ width: '40px' }} variety={ButtonVariety.FILTERS} onClick={handleIncrement}>
                <PlusOutlined />
              </CustomButton>
            </div>
          </div>
          <div className={styles['price-box']}>
            {discountedPrice ? formatMoney(discountedPrice * quantity) : formatMoney(price * quantity)}
          </div>
        </div>
      </div>
    </li>
  );
});
