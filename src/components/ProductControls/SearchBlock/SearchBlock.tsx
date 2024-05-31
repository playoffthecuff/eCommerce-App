import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

import styles from './SearchBlock.module.css';

const { Search } = Input;

export default function SearchBlock() {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  return (
    <Search
      placeholder="search bicycle"
      allowClear
      onSearch={onSearch}
      style={{ width: 300 }}
      className={styles['search-input']}
    />
  );
}
