import { Select } from 'antd';
import { observer } from 'mobx-react-lite';

import { catalogStore } from '../../../store/catalog-store';

import styles from './SortBlock.module.css';
import { Payload } from '../../../types/types';

const { Option } = Select;

export default observer(function SortBlock() {
  const { payload, applyFilters } = catalogStore;

  const handleSortChange = (value: string) => {
    let sortField: string = '';
    let sortOrder: 'ASC' | 'DESC' = 'ASC';

    switch (value) {
      case 'Alphabetically, A-Z':
        sortField = 'title';
        sortOrder = 'ASC';
        break;
      case 'Alphabetically, Z-A':
        sortField = 'title';
        sortOrder = 'DESC';
        break;
      case 'Price, low to high':
        sortField = 'price';
        sortOrder = 'ASC';
        break;
      case 'Price, high to low':
        sortField = 'price';
        sortOrder = 'DESC';
        break;
      default:
        break;
    }

    if (sortField) {
      const updatedPayload: Payload = {
        ...payload,
        sorts: [{ field: sortField, order: sortOrder }],
      };

      applyFilters(updatedPayload);
    }
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
