import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import styles from './CartItem.module.css';
import { CartItem as CartItemData } from '../../../../types/types';

import placeholder from '../../../../assets/images/load_failed.webp';

type CartItemProps = {
  item: CartItemData;
};

function CartItem({ item }: CartItemProps) {
  const { price, thumbs, discountedPrice, title, vendorCode, size, quantity } = item;

  return (
    <li className={styles['product-card']}>
      <div className={styles['product-box']}>
        <div className={styles['product-img']}>
          <img src={thumbs ? `data:image/jpeg;base64,${thumbs}` : placeholder} alt={title} />
        </div>
        <div style={{ paddingLeft: '1rem' }}>
          <Typography.Title style={{ margin: 0 }} level={4}>
            {title}
          </Typography.Title>
          <div className={styles['product-prop']}>
            <Typography.Paragraph className={styles['vendor-code']} copyable>
              #{vendorCode}
            </Typography.Paragraph>
            {item.discountedPrice ? (
              <>
                <p>Unit Price: ${price}</p>
                <p>Unit Discounted Price: ${discountedPrice}</p>
              </>
            ) : (
              <p>Unit Price: ${price}</p>
            )}
            <p>Unit Size: {size}</p>
          </div>
        </div>
      </div>
      <div className={styles['product-setting-box']}>
        <div className={styles['counter-box']}>
          <div className={styles['product-counter']}>
            <div className={styles['product-controller']}>
              <MinusOutlined />
            </div>
            <div className={styles.quantity}>{quantity}</div>
            <div className={styles['product-controller']}>
              <PlusOutlined />
            </div>
          </div>
        </div>
        <div className={styles['price-box']}>${price}</div>
        <div className={styles.cross}>
          <CloseOutlined />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
