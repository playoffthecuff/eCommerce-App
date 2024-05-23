import { Typography } from 'antd';
import ProductCard from '../ProductCard/ProductCard';

import styles from './BestBikes.module.css';
import CustomButton from '../CustomButton/CustomButton';

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
      <CustomButton variety="common" htmlType="button" style={{ alignSelf: 'center' }}>
        LOAD MORE
      </CustomButton>
    </section>
  );
}

export default BestBikes;
