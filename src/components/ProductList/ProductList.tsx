// import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'antd';

import { productsStore } from '../../store/product-store';
// import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
// import { BootState } from '../../enums';
// import { Country } from '../../utils/product-service';
// import ProductLoader from '../ProductCard/subComponents/ProductLoader/ProductLoader';

import TestCard from '../ProductCard/TestCard';

export default observer(function ProductList() {
  const PAGE_SIZE = 8;
  const { allProducts, productsState } = productsStore;

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: PAGE_SIZE,
        showSizeChanger: false,
        align: 'center',
      }}
      dataSource={allProducts}
      renderItem={(product) => {
        return <List.Item key={String(product._id)} actions={[<TestCard {...product} loading={productsState} />]} />;
      }}
      className={styles['product-list']}
    />
  );
});
