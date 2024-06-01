import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import styles from './SortBlock.module.css';

const { Option } = Select;

export default observer(function SortBlock() {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (value: string) => {
    setSortOption(value);
    console.log('Selected Sort Option:', sortOption);
  };

  return (
    <div className={styles['sort-block']}>
      <Select
        style={{ width: '100%' }}
        onChange={handleSortChange}
        placeholder="select sort order"
        className={styles.select}
      >
        <Option value="Alphabetically, A-Z">Alphabetically, A-Z</Option>
        <Option value="Alphabetically, Z-A">Alphabetically, Z-A</Option>
        <Option value="Price, low to high">Price, low to high</Option>
        <Option value="Price, high to low">Price, high to low</Option>
      </Select>
    </div>
  );
});
