import { Input } from 'antd';
import { debounce } from 'lodash';
import type { SearchProps } from 'antd/es/input/Search';

import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import styles from './SearchBlock.module.css';
import { catalogStore } from '../../../store/catalog-store';

const { Search } = Input;

export default observer(function SearchBlock() {
  const { payload, applyFilters } = catalogStore;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      applyFilters({
        ...payload,
        query: value,
        page: 1,
      });
    }, 750),
    [payload.filters, payload.page, payload.pageSize]
  );

  const onSearch: SearchProps['onSearch'] = (value: string) => {
    debouncedSearch(value);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <Search
      placeholder="search bicycle"
      allowClear
      onSearch={onSearch}
      onChange={onChange}
      style={{ width: 300 }}
      className={styles['search-input']}
    />
  );
});
