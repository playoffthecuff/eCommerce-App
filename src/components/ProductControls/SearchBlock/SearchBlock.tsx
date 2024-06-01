import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

import { observer } from 'mobx-react-lite';
import styles from './SearchBlock.module.css';
import { productsStore } from '../../../store/catalog-store';

const { Search } = Input;

export default observer(function SearchBlock() {
  const { payload } = productsStore;

  const onSearch: SearchProps['onSearch'] = (value: string) => {
    productsStore.applyFilters({
      query: value,
      filters: payload.filters,
      page: payload.page,
      pageSize: payload.pageSize,
    });
  };

  return (
    <Search
      placeholder="search bicycle"
      allowClear
      onSearch={onSearch}
      style={{ width: 300 }}
      className={styles['search-input']}
    />
  );
});
