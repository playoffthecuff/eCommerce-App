import { observer } from 'mobx-react-lite';
import { Typography } from 'antd';
import { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';

import { catalogStore } from '../../store/catalog-store';

import styles from './BestBikes.module.css';

const { Title } = Typography;

export default observer(function BestBikes() {
  const { loadProducts, products, productsState } = catalogStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section className={styles['best-bikes']}>
      <Title level={2} className={styles['best-bikes-title']}>
        Best Selling Bikes
      </Title>
      <ul className={styles['product-wrapper']}>
        {products.slice(0, 4).map((product) => {
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
