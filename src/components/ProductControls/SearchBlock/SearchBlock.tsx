import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

import { observer } from 'mobx-react-lite';
import styles from './SearchBlock.module.css';
import { catalogStore } from '../../../store/catalog-store';

const { Search } = Input;

export default observer(function SearchBlock() {
  const { payload, applyFilters } = catalogStore;

  const onSearch: SearchProps['onSearch'] = (value: string) => {
    applyFilters({
      ...payload,
      query: value,
      page: 1,
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
