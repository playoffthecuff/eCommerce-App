import { List, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import { DEFAULT_PAGE_SIZE, catalogStore } from '../../store/catalog-store';
import { cartStore } from '../../store/cart-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
import { BootState } from '../../types/boot-state';

export default observer(function ProductList() {
  const { products, productsState, totalPage, currentPage } = catalogStore;
  const [query, setQuery] = useSearchParams();

  const handlePageChange = (page: number) => {
    query.set('page', page.toString(10));
    setQuery(query);
  };

  useEffect(() => {
    cartStore.loadItems();
  }, []);

  return (
    <Spin spinning={productsState === BootState.InProgress}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            handlePageChange(page);
          },
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: false,
          align: 'center',
          total: totalPage,
          current: currentPage,
        }}
        dataSource={products}
        renderItem={(product) => {
          return (
            <List.Item>
              <ProductCard product={product} loading={productsState} />
            </List.Item>
          );
        }}
        className={styles['product-list']}
      />
    </Spin>
  );
});
