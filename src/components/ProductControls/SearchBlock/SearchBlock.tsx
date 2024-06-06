import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../../../store/catalog-store';
import styles from './SearchBlock.module.css';

const { Search } = Input;

export default observer(function SearchBlock() {
  const [query, setQuery] = useSearchParams();

  const onSearch: SearchProps['onSearch'] = (value: string) => {
    query.set('page', DEFAULT_PAGE.toString(10));
    query.set('query', value);
    setQuery(query);
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
