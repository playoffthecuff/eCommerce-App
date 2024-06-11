import { observer } from 'mobx-react-lite';
import { Spin, Typography } from 'antd';
import { useEffect } from 'react';
// import { autorun } from 'mobx';
import ProductCard from '../ProductCard/ProductCard';

import { catalogStore } from '../../store/catalog-store';

import styles from './BestBikes.module.css';
import { BootState } from '../../types/boot-state';
// import userStore from '../../store/user-store';
// import { cartStore } from '../../store/cart-store';

const { Title } = Typography;

export default observer(function BestBikes() {
  const { loadBestSellingProducts, bestSellingProducts, productsState } = catalogStore;

  useEffect(() => {
    loadBestSellingProducts();
  }, [loadBestSellingProducts]);

  // useEffect(() => {
  //   const disposer = autorun(() => {
  //     const currentUser = userStore.user?.id;
  //     if (!currentUser) {
  //       cartStore.createTempCart();
  //     } else {
  //       cartStore.loadItems();
  //     }
  //   });

  //   return () => disposer();
  // }, []);

  // useEffect(() => {
  //   cartStore.loadItems();
  // }, []);

  return (
    <section className={styles['best-bikes']}>
      <Title level={2} className={styles['best-bikes-title']}>
        Best Selling Bikes
      </Title>
      <Spin spinning={productsState === BootState.InProgress}>
        <ul className={styles['product-wrapper']}>
          {bestSellingProducts.map((product) => {
            return (
              <li key={product._id}>
                <ProductCard product={product} loading={productsState} />
              </li>
            );
          })}
        </ul>
      </Spin>
    </section>
  );
});
