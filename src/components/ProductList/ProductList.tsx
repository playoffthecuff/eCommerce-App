import { observer } from 'mobx-react-lite';
import { List, Spin } from 'antd';

import { catalogStore } from '../../store/catalog-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';
import { BootState } from '../../types/boot-state';

const PAGE_SIZE = 8;

export default observer(function ProductList() {
  const { products, productsState, totalPage, changePage, currentPage } = catalogStore;

  const handlePageChange = (page: number) => {
    changePage(page);
  };

  return (
    <Spin spinning={productsState === BootState.InProgress}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            handlePageChange(page);
          },
          pageSize: PAGE_SIZE,
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
