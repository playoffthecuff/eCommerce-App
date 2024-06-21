import { Card, Spin, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cart-store';

import styles from './MainBanner.module.css';

import backgroundImage from '../../assets/images/promo-5.jpg';
import { BootState } from '../../types/boot-state';

const { Text } = Typography;

interface Props {
  slogan: string;
  promoCode: string;
}

export default observer(function MainBanner({ slogan, promoCode }: Props) {
  const isLoading = cartStore.cartState === BootState.InProgress;
  const promo = cartStore.promoCodes[1];

  let promoContent;

  if (isLoading) {
    promoContent = 'Loading...';
  } else if (promo) {
    promoContent = (
      <>
        Use the code{' '}
        <Text strong copyable={{ text: promoCode }}>
          {promoCode}
        </Text>{' '}
        and get a {promo.discount * 100}% discount for the first order!
      </>
    );
  } else {
    promoContent = 'No promotions available.';
  }

  return (
    <Spin spinning={isLoading}>
      <section className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Card bordered={false} className={styles.bannerCard}>
          <h2 className={styles.bannerSlogan}>{slogan}</h2>
          <Text className={styles.bannerPromo}>{promoContent}</Text>
        </Card>
      </section>
    </Spin>
  );
});
