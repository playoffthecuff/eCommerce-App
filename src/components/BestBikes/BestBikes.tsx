import { Button, Typography } from 'antd';
import ProductCard from '../ProductCard/ProductCard';

import styles from './BestBikes.module.css';

const { Title } = Typography;

function BestBikes() {
  return (
    <section className={styles['best-bikes']}>
      <Title level={2} className={styles['best-bikes-title']}>
        Best Selling Bikes
      </Title>
      <div className={styles['product-wrapper']}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Button type="primary" htmlType="button" block className={styles['best-bikes-button']}>
        Load More
      </Button>
    </section>
  );
}

export default BestBikes;
