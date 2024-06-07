import { Typography } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Cart.module.css';

export function CartPage() {
  return (
    <div style={{ marginLeft: '2rem' }}>
      <Typography.Title level={3}>SHOPPING BAG</Typography.Title>
      <ProductItem />
    </div>
  );
}

function ProductItem() {
  return (
    <div className={styles['product-card']}>
      <div className={styles['product-box']}>
        <div className={styles['product-img']}>img</div>
        <div style={{ paddingLeft: '1rem' }}>
          <Typography.Title style={{ margin: 0 }} level={4}>
            ITEM TITLE
          </Typography.Title>
          <div className={styles['product-prop']}>
            <Typography.Paragraph style={{ margin: 0 }} copyable>
              #643423
            </Typography.Paragraph>
            <Typography.Text>Unit Price: $35</Typography.Text>
          </div>
        </div>
      </div>
      <div className={styles['product-setting-box']}>
        <div className={styles['counter-box']}>
          <div className={styles['product-counter']}>
            <div className={styles['product-controller']}>
              <PlusOutlined />
            </div>
            <div className={styles.quantity}>1</div>
            <div className={styles['product-controller']}>
              <MinusOutlined />
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
