import { observer } from 'mobx-react-lite';
import { List } from 'antd';

import { catalogStore } from '../../store/catalog-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

export default observer(function ProductList() {
  const PAGE_SIZE = 8;
  const { products, productsState, totalPage } = catalogStore;

  const handlePageChange = (page: number) => {
    catalogStore.changePage(page);
  };

  return (
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
  );
});
