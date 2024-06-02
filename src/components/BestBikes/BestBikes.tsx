import { observer } from 'mobx-react-lite';
import { Typography } from 'antd';
import { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';

import { catalogStore } from '../../store/catalog-store';

import styles from './BestBikes.module.css';

const { Title } = Typography;

export default observer(function BestBikes() {
  const { loadBestSellingProducts, bestSellingProducts, productsState } = catalogStore;

  useEffect(() => {
    loadBestSellingProducts();
  }, [loadBestSellingProducts]);

  return (
    <section className={styles['best-bikes']}>
      <Title level={2} className={styles['best-bikes-title']}>
        Best Selling Bikes
      </Title>
      <ul className={styles['product-wrapper']}>
        {bestSellingProducts.slice(0, 4).map((product) => {
          return (
            <li key={product._id}>
              <ProductCard product={product} loading={productsState} />
            </li>
          );
        })}
      </ul>
    </section>
  );
});
