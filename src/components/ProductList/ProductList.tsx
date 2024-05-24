// import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'antd';

import { productsStore } from '../../store/product-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
// import { BootState } from '../../enums';
// import { Country } from '../../utils/product-service';
// import ProductLoader from './ProductLoader';

export default observer(function ProductList() {
  const { products, state } = productsStore;
  console.log(state);

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
      dataSource={products}
      renderItem={(product) => {
        return (
          <List.Item key={product._id} actions={[<ProductCard {...product} />]}>
            {product.name}
          </List.Item>
        );
      }}
      className={styles['product-list']}
    />
  );
});
