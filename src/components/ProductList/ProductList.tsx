// import { useEffect } from 'react';
import { List, Skeleton } from 'antd';

import { productsStore } from '../../store/product-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
import { BootState } from '../../enums';
import { Country } from '../../utils/product-service';
// import ProductLoader from './ProductLoader';

export default function ProductList() {
  const { products, state } = productsStore;
  console.log(state);

  const dataSource: (Partial<Country> | undefined)[] =
    state === BootState.Success ? products : Array.from({ length: 8 });

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
        showSizeChanger: false,
        align: 'center',
      }}
      dataSource={dataSource}
      renderItem={(product, index) => {
        if (!product) {
          return (
            <List.Item key={index}>
              <Skeleton />
            </List.Item>
          );
        }

        return (
          <List.Item key={product._id} actions={[<ProductCard {...product} />]}>
            {product.name}
          </List.Item>
        );
      }}
      className={styles['product-list']}
    />
  );
}
