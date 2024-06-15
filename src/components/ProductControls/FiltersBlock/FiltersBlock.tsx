import { Layout, Typography, Collapse, Checkbox, Slider, CollapseProps, Tooltip } from 'antd';

import { useEffect, useState } from 'react';
import { CloseOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PRODUCT_PRICE, catalogStore } from '../../../store/catalog-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';
import { Sort } from '../../../types/types';
import { toTitleCase } from '../../../utils/string-functions';

const { Sider } = Layout;
const { Title } = Typography;

export default observer(function FiltersBlock() {
  const { filtersData, loadFiltersData, resetFilters, applyFilters } = catalogStore;

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  // const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
    if (collapsed) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  };

  const closeMenu = () => {
    setCollapsed(true);
    document.documentElement.classList.remove('no-scroll');
  };

  const onColorChange = (checkedValues: string[]) => {
    setSelectedColors(checkedValues);
  };

  const onCategoryChange = (checkedValues: string[]) => {
    setSelectedCategories(checkedValues);
  };

  const onRatingChange = (checkedValues: number[]) => {
    setSelectedRating(checkedValues);
  };

  // const onRatingChange = (checkedValue: number) => {
  //   setSelectedRating(checkedValue);
  // };

  const onWeightChange = (checkedValues: number[]) => {
    setSelectedWeight(checkedValues);
  };

  const onPriceChange = (checkedValues: number[]) => {
    setSelectedPriceRange(checkedValues);
  };

  useEffect(() => {
    const categories = query.getAll('category').map((cat) => cat.toLowerCase());
    const colors = query.getAll('color');
    const rating = query
      .getAll('rating')
      .map((str) => Number(str))
      .filter((num) => !Number.isNaN(num) && num >= 0);
    // const rating = Number(query.get('rating')) || 1;
    const weight = query
      .getAll('weight')
      .map((str) => Number(str))
      .filter((num) => !Number.isNaN(num) && num >= 0);
    const minPrice =
      (Number(query.get('min_price')) >= 0 && Number(query.get('min_price'))) || filtersData?.minPrice || 0;
    const maxPrice =
      (Number(query.get('max_price')) >= 0 && Number(query.get('max_price'))) ||
      filtersData?.maxPrice ||
      MAX_PRODUCT_PRICE;
    const q = query.get('query') || undefined;
    const page = Number(query.get('page')) || DEFAULT_PAGE;
    const pageSize = Number(query.get('page_size')) || DEFAULT_PAGE_SIZE;
    const sortBy = query.get('sort_by') || '';
    const sortOrder = query.get('sort_order') || 'ASC';

    applyFilters({
      filters: {
        colors,
        categories,
        rating,
        weight,
        minPrice,
        maxPrice,
      },
      page: Number.isNaN(page) ? DEFAULT_PAGE : page,
      pageSize: Number.isNaN(pageSize) ? DEFAULT_PAGE_SIZE : pageSize,
      query: q || '',
      sorts: [{ field: sortBy.toLowerCase(), order: sortOrder.toUpperCase() } as Sort],
    });
    setSelectedCategories(categories);
    setSelectedColors(colors);
    setSelectedRating(rating);
    setSelectedWeight(weight);
    setSelectedPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
  }, [location.pathname, location.search]);

  const handleApplyFilters = () => {
    query.delete('category');
    selectedCategories.forEach((cat) => query.append('category', cat));
    query.delete('color');
    selectedColors.forEach((color) => query.append('color', color));
    query.delete('rating');
    selectedRating.forEach((rating) => query.append('rating', String(rating)));
    // query.delete('rating');
    // query.append('rating', String(selectedRating));
    query.delete('weight');
    selectedWeight.forEach((weight) => query.append('weight', String(weight)));
    query.set('min_price', String(selectedPriceRange[0]));
    query.set('max_price', String(selectedPriceRange[1]));
    query.set('page', String(DEFAULT_PAGE));
    setQuery(query);
    closeMenu();
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedWeight([]);
    setSelectedRating([]);
    // setSelectedRating(1);
    setSelectedPriceRange([filtersData?.minPrice || 0, filtersData?.maxPrice || MAX_PRODUCT_PRICE]);
    resetFilters();
    navigate({ pathname: location.pathname, search: '' });
    closeMenu();
  };

  useEffect(() => {
    loadFiltersData();
  }, [loadFiltersData]);

  const items: CollapseProps['items'] = [
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
            max={Math.ceil(filtersData?.maxPrice || MAX_PRODUCT_PRICE)}
            onChange={onPriceChange}
          />
          <div className={styles['price-range']}>
            ${Math.floor(selectedPriceRange[0])} - ${Math.ceil(selectedPriceRange[1])}
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
          value={selectedCategories}
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
        <Checkbox.Group
          options={filtersData?.rating}
          className={styles['filter-group']}
          onChange={onRatingChange}
          value={selectedRating}
        />
      ),
    },
    // {
    //   key: '5',
    //   label: 'RATING',
    //   children: (
    //     <Radio.Group
    //       onChange={(e) => onRatingChange(e.target.value)}
    //       value={selectedRating}
    //       className={styles['filter-group']}
    //     >
    //       <Radio value={1}>
    //         <Rate disabled defaultValue={1} /> and Up
    //       </Radio>
    //       <Radio value={2}>
    //         <Rate disabled defaultValue={2} /> and Up
    //       </Radio>
    //       <Radio value={3}>
    //         <Rate disabled defaultValue={3} /> and Up
    //       </Radio>
    //       <Radio value={4}>
    //         <Rate disabled defaultValue={4} /> and Up
    //       </Radio>
    //       <Radio value={5}>
    //         <Rate disabled defaultValue={5} />
    //       </Radio>
    //     </Radio.Group>
    //   ),
    // },
  ];

  return (
    <div className={styles['filters-block-wrapper']}>
      <div className={classNames(styles.overlay, collapsed ? styles.hidden : '')} onClick={closeMenu} />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className={styles['filters-content']}
        style={{
          left: collapsed ? '-100%' : '0',
          position: 'fixed',
          height: '100vh',
          top: '48px',
          overflow: 'auto',
        }}
      >
        <div className={styles['menu-header']}>
          <Title level={2} className={styles['menu-title']}>
            FILTERS
          </Title>
          <CloseOutlined className={styles['close-button']} onClick={closeMenu} />
        </div>
        <Collapse items={items} bordered={false} className={styles['filter-collapse']} />
        <div className={styles['buttons-wrapper']}>
          <CustomButton style={{ width: '160px' }} variety="common" htmlType="button" onClick={handleApplyFilters}>
            Apply
          </CustomButton>
          <CustomButton style={{ width: '160px' }} variety="common" htmlType="button" onClick={handleResetFilters}>
            Reset Filters
          </CustomButton>
        </div>
      </Sider>

      <CustomButton
        style={{ width: '160px' }}
        variety="filters"
        htmlType="button"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleMenu}
      >
        Filter
      </CustomButton>
    </div>
  );
});
