import { Slider, Checkbox, Tooltip, Radio, Rate, CollapseProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from '../FiltersBlock.module.css';
import { FiltersData } from '../../../../types/types';
import { formatMoney } from '../../../../utils/format-money';
import { toTitleCase } from '../../../../utils/string-functions';

interface FilterItemsProps {
  selectedPriceRange: number[];
  onPriceChange: (value: number[]) => void;
  selectedCategories: string[];
  onCategoryChange: (checkedValues: string[]) => void;
  filtersData: FiltersData;
  selectedColors: string[];
  onColorChange: (checkedValues: string[]) => void;
  selectedWeight: number[];
  onWeightChange: (checkedValues: number[]) => void;
  selectedRating: number;
  onRatingChange: (checkedValue: number) => void;
}

export const getFilterItems = ({
  selectedPriceRange,
  onPriceChange,
  selectedCategories,
  onCategoryChange,
  filtersData,
  selectedColors,
  onColorChange,
  selectedWeight,
  onWeightChange,
  selectedRating,
  onRatingChange,
}: FilterItemsProps): CollapseProps['items'] => [
  {
    key: '1',
    label: 'PRICE',
    children: (
      <>
        <Slider
          range
          className={styles['price-slider']}
          step={10}
          tooltip={{ placement: 'top' }}
          defaultValue={selectedPriceRange}
          value={selectedPriceRange}
          min={Math.floor(filtersData?.minPrice || 0)}
          max={Math.ceil(filtersData?.maxPrice || 10000)}
          onChange={onPriceChange}
        />
        <div className={styles['price-range']}>
          {formatMoney(Math.floor(selectedPriceRange[0]), false)} -
          {formatMoney(Math.ceil(selectedPriceRange[1]), false)}
        </div>
      </>
    ),
  },
  {
    key: '2',
    label: 'CATEGORIES',
    children: (
      <Checkbox.Group
        options={filtersData?.categories?.map((category) => toTitleCase(category)) || []}
        className={styles['filter-group']}
        onChange={onCategoryChange}
        value={selectedCategories.map((category) => toTitleCase(category))}
      />
    ),
  },
  {
    key: '3',
    label: 'COLORS',
    children: (
      <Checkbox.Group
        options={filtersData?.colors}
        className={styles['filter-group']}
        onChange={onColorChange}
        value={selectedColors}
      />
    ),
  },
  {
    key: '4',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        WEIGHT LIMIT
        <Tooltip title="Max rider weight" placement="top">
          <InfoCircleOutlined style={{ marginLeft: 8 }} />
        </Tooltip>
      </div>
    ),
    children: (
      <Checkbox.Group
        // options={filtersData?.weight}
        options={filtersData?.weight?.map((weight) => `${weight} kg`) || []}
        className={styles['filter-group']}
        onChange={onWeightChange}
        value={selectedWeight}
      />
    ),
  },
  {
    key: '5',
    label: 'RATING',
    children: (
      <Radio.Group
        onChange={(e) => onRatingChange(e.target.value)}
        value={selectedRating}
        className={styles['filter-group']}
      >
        <Radio value={1}>
          <Rate disabled defaultValue={1} /> and Up
        </Radio>
        <Radio value={2}>
          <Rate disabled defaultValue={2} /> and Up
        </Radio>
        <Radio value={3}>
          <Rate disabled defaultValue={3} /> and Up
        </Radio>
        <Radio value={4}>
          <Rate disabled defaultValue={4} /> and Up
        </Radio>
        <Radio value={5}>
          <Rate disabled defaultValue={5} />
        </Radio>
      </Radio.Group>
    ),
  },
];
