import { Row, Col, Card, Typography } from 'antd';

import MainBanner from '../MainBanner/MainBanner';
import { cartStore } from '../../store/cart-store';

import styles from './Promo.module.css';

import bikeImage from '../../assets/images/promo-2.jpg';
import accessoriesImage from '../../assets/images/promo-3.webp';

const { Title } = Typography;

export default function Promo() {
  const handleBikesClick = () => {
    window.location.href = '#/catalog?category=Bikes';
  };

  const handleAccessoriesClick = () => {
    window.location.href = '#/catalog?category=Accessory';
  };

  return (
    <section className={styles.promoSection}>
      <Title level={2} className={styles.promoTitle}>
        Ride & Redeem
      </Title>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            className={styles.card}
            style={{ backgroundImage: `url(${bikeImage})` }}
            onClick={handleBikesClick}
          >
            <div className={styles.cardContent}>
              <h2>Bikes</h2>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            className={styles.card}
            style={{ backgroundImage: `url(${accessoriesImage})` }}
            onClick={handleAccessoriesClick}
          >
            <div className={styles.cardContent}>
              <h2>Accessories</h2>
            </div>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24}>
          <MainBanner slogan="Gear Up & Save" promoCode={cartStore.promoCodes[1].code} />
        </Col>
      </Row>
    </section>
  );
}
