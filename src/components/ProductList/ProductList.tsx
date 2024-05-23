// import { useEffect } from 'react';
import { List } from 'antd';

import { productsStore } from '../../store/product-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
// import { BootState } from '../../enums';

export default function ProductList() {
  const { products, state } = productsStore;
  console.log(state);

  return (
    <List
      itemLayout="vertical"
      size="large"
      // loading={state === BootState.InProgress}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
        showSizeChanger: false,
        align: 'center',
      }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item
          key={product._id}
          actions={[
            <ProductCard name={product.name} abbrev={product.abbrev} postalCodePattern={product.postalCodePattern} />,
          ]}
        >
          {product.name}
        </List.Item>
      )}
      className={styles['product-list']}
    />
  );
}
