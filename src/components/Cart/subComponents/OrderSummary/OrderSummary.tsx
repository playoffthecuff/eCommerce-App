import { Collapse, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import CustomButton from '../../../CustomButton/CustomButton';
import OrderSaving from '../OrderSaving/OrderSaving';
import { cartStore } from '../../../../store/cart-store';

import styles from './OrderSummary.module.css';
import { formatMoney } from '../../../../utils/format-money';

export default observer(function OrderSummary() {
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
        <p>Total</p>
        <p>{formatMoney(cartStore.totalPrice)}</p>
      </div>
      <CustomButton variety="common" block>
        PLACE ORDER
      </CustomButton>
    </div>
  );
});
