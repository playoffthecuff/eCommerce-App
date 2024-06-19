/* eslint-disable no-unsafe-optional-chaining */
import { Card, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cart-store';

import styles from './MainBanner.module.css';

import backgroundImage from '../../assets/images/promo-5.jpg';

const { Text } = Typography;

interface Props {
  slogan: string;
  promoCode: string;
}

export default observer(function MainBanner({ slogan, promoCode }: Props) {
  return (
    <section className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Card bordered={false} className={styles.bannerCard}>
        <h2 className={styles.bannerSlogan}>{slogan}</h2>
        <Text className={styles.bannerPromo}>
          Use the code{' '}
          <Text strong copyable={{ text: promoCode }}>
            {promoCode}
          </Text>{' '}
          and get a {cartStore.promoCodes[1]?.discount * 100}% discount for the first order!
        </Text>
      </Card>
    </section>
  );
});
