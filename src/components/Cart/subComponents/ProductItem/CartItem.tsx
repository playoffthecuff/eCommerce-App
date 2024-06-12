import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import styles from './CartItem.module.css';

function CartItem() {
  return (
    <div className={styles['product-card']}>
      <div className={styles['product-box']}>
        <div className={styles['product-img']}>img</div>
        <div style={{ paddingLeft: '1rem' }}>
          <Typography.Title style={{ margin: 0 }} level={4}>
            ITEM TITLE
          </Typography.Title>
          <div className={styles['product-prop']}>
            <Typography.Paragraph className={styles['vendor-code']} copyable>
              #643423
            </Typography.Paragraph>
            <p>Unit Price: $35</p>
          </div>
        </div>
      </div>
      <div className={styles['product-setting-box']}>
        <div className={styles['counter-box']}>
          <div className={styles['product-counter']}>
            <div className={styles['product-controller']}>
              <MinusOutlined />
            </div>
            <div className={styles.quantity}>1</div>
            <div className={styles['product-controller']}>
              <PlusOutlined />
            </div>
          </div>
        </div>
        <div className={styles['price-box']}>$35.00</div>
        <div className={styles.cross}>
          <CloseOutlined />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
