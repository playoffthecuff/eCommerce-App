// import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'antd';

import { productsStore } from '../../store/product-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default observer(function ProductList() {
  const PAGE_SIZE = 8;
  const { products, productsState, totalPage } = productsStore;

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
        total: totalPage,
      }}
      dataSource={products}
      renderItem={(product) => {
        return <List.Item key={String(product._id)} actions={[<ProductCard {...product} loading={productsState} />]} />;
      }}
      className={styles['product-list']}
    />
  );
});
