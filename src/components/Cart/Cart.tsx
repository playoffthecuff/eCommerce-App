import { Typography, Collapse, Input } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Cart.module.css';
import CustomButton from '../CustomButton/CustomButton';

export function CartPage() {
  return (
    <div className={styles['cart-container']}>
      <Typography.Title level={3}>SHOPPING BAG</Typography.Title>
      <div className={styles['cart-section']}>
        <div style={{ marginBottom: 0 }} className={styles['product-container']}>
          <ProductItem />
          <ProductItem />
          <div className={styles['order-saving-under']}>
            <OrderSaving />
          </div>
          <div className={styles['estimated-total-under']}>
            <p>Estimated Total</p>
            <p>$30.00</p>
          </div>
        </div>
        <OrderSummary />
      </div>
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

function OrderSummary() {
  return (
    <div className={styles['order-box']}>
      <h2 className={styles['order-box-title']}>ORDER SUMMARY</h2>
      <div className={styles['order-saving-box']}>
        <OrderSaving />
      </div>

      <Collapse
        items={[
          {
            key: '1',
            label: 'Promo Code',
            children: (
              <>
                <div className={styles['collapse-into']}>
                  <Input placeholder="Enter promo code" />
                  <CustomButton style={{ width: '100px' }} variety="common" block>
                    APPLY
                  </CustomButton>
                </div>
                <p className={styles['collapse-text']}>Only one code allowed per order.</p>
              </>
            ),
          },
        ]}
        style={{ fontFamily: 'Futura', fontWeight: 600, fontSize: '1.5rem' }}
      />
      <div className={styles['estimated-total']}>
        <p>Estimated Total</p>
        <p>$30.00</p>
      </div>
      <CustomButton variety="common" block>
        PLACE ORDER
      </CustomButton>
    </div>
  );
}

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
