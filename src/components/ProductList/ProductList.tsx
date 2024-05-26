// import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'antd';

import { productsStore } from '../../store/product-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
import { BootState } from '../../enums';
// import { Country } from '../../utils/product-service';
import ProductLoader from '../ProductCard/subComponents/ProductLoader/ProductLoader';

export default observer(function ProductList() {
  const PAGE_SIZE = 6;
  const { products, productsState } = productsStore;
  console.log(productsState);

  // const skeletons = Array.from({ length: PAGE_SIZE }, (_, index) => ({
  //   isPlaceholder: true,
  //   key: index,
  // }));

  // const dataSource = productsState === BootState.InProgress ? skeletons : products;
  const dataSource = productsState === BootState.InProgress ? Array(PAGE_SIZE).fill({}) : products;

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
      dataSource={dataSource}
      renderItem={(product, index) => {
        return (
          <List.Item
            key={product._id || index}
            actions={[productsState === BootState.InProgress ? <ProductLoader /> : <ProductCard {...product} />]}
          >
            {product.name}
          </List.Item>
        );
      }}
      className={styles['product-list']}
    />
  );
});
