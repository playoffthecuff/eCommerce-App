import { Collapse, Input, notification } from 'antd';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import CustomButton from '../../../CustomButton/CustomButton';
import { cartStore } from '../../../../store/cart-store';
import { formatMoney } from '../../../../utils/format-money';
import OrderSaving from '../OrderSaving/OrderSaving';
import styles from './OrderSummary.module.css';

export default observer(function OrderSummary() {
  const [promoCode, setPromoCode] = useState('');
  const [notificationAPI, contextHolder] = notification.useNotification();

  const handleApplyPromoCode = async () => {
    try {
      await cartStore.applyPromoCode(promoCode.trim());
      notificationAPI.success({
        message: `You have added promo code to the cart.`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (error) {
      notificationAPI.error({
        message: `Failed to add promo code to the cart.`,
        description: 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
  };

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
                  {!cartStore.promo && (
                    <>
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <CustomButton style={{ width: '100px' }} variety="common" block onClick={handleApplyPromoCode}>
                        APPLY
                      </CustomButton>
                    </>
                  )}
                  {cartStore.promo && (
                    <>
                      <Input placeholder="Enter promo code" value={cartStore.promo.code} disabled />
                      <CustomButton
                        style={{ width: '100px' }}
                        variety="common"
                        block
                        onClick={() => {
                          setPromoCode('');
                          cartStore.removePromoCode();
                        }}
                      >
                        RESET
                      </CustomButton>
                    </>
                  )}
                </div>
                <p className={styles['collapse-text']}>Only one code is allowed per order.</p>
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
      {contextHolder}
    </div>
  );
});
