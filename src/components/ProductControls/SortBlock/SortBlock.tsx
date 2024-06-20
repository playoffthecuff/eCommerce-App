import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import styles from './SortBlock.module.css';
import { DEFAULT_PAGE, catalogStore } from '../../../store/catalog-store';
import { Sort } from '../../../types/types';

const { Option } = Select;

export default observer(function SortBlock() {
  const [query, setQuery] = useSearchParams();

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
      query.set('sort_by', sortField);
      query.set('sort_order', sortOrder);
      query.set('page', DEFAULT_PAGE.toString(10));
      setQuery(query);
    }
  };

  return (
    <div className={styles['sort-block']}>
      <Select
        style={{ width: '100%' }}
        onChange={handleSortChange}
        placeholder="Sort order..."
        className={styles.select}
        value={sortToValue(catalogStore.payload.sorts?.[0])}
      >
        <Option value="Alphabetically, A-Z">Alphabetically, A-Z 🠗</Option>
        <Option value="Alphabetically, Z-A">Alphabetically, Z-A 🠕</Option>
        <Option value="Price, low to high">Price, low to high 🠗</Option>
        <Option value="Price, high to low">Price, high to low 🠕</Option>
      </Select>
    </div>
  );
});

function sortToValue(sort: Sort | undefined): string | undefined {
  if (!sort) return undefined;
  const { field, order } = sort;
  if (field === 'title') {
    return order === 'ASC' ? 'Alphabetically, A-Z' : 'Alphabetically, Z-A';
  }
  if (field === 'price') {
    return order === 'ASC' ? 'Price, low to high' : 'Price, high to low';
  }
  return undefined;
}
