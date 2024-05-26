import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

export default function SearchBlock() {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  return <Search placeholder="search cycle" allowClear onSearch={onSearch} style={{ width: 200 }} />;
}
