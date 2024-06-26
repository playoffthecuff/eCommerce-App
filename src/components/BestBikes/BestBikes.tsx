import { observer } from 'mobx-react-lite';
import { Typography } from 'antd';
import { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { catalogStore } from '../../store/catalog-store';
import styles from './BestBikes.module.css';
import { BootState } from '../../types/boot-state';
import { cartStore } from '../../store/cart-store';
import { CubeSpin } from '../CubeSpinner/CubeSpinner';

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
      <CubeSpin spinning={productsState === BootState.InProgress || cartStore.cartState === BootState.InProgress}>
        <ul className={styles['product-wrapper']}>
          {bestSellingProducts.map((product) => {
            return (
              <li key={product._id} className={styles['product-list-item']}>
                <ProductCard product={product} loading={productsState} />
              </li>
            );
          })}
        </ul>
      </CubeSpin>
    </section>
  );
});
