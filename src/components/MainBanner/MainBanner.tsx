import { Card, message, Typography } from 'antd';

import styles from './MainBanner.module.css';

import backgroundImage from '../../assets/images/promo-5.jpg';

const { Text } = Typography;

interface Props {
  slogan: string;
  promoCode: string;
}

export default function MainBanner({ slogan, promoCode }: Props) {
  const onApplyPromoCode = () => {
    navigator.clipboard
      .writeText(promoCode)
      .then(() => {
        message.success('Promo code copied to clipboard!');
      })
      .catch(() => {
        message.error('Failed to copy promo code.');
      });
  };

  return (
    <section className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Card bordered={false} className={styles.bannerCard}>
        <h2 className={styles.bannerSlogan}>{slogan}</h2>
        <Text className={styles.bannerPromo}>
          Use the code{' '}
          <Text strong copyable={{ text: promoCode }} onClick={onApplyPromoCode}>
            {promoCode}
          </Text>{' '}
          and get a discount!
        </Text>
      </Card>
    </section>
  );
}
