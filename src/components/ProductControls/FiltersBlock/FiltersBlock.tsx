import { Layout, Typography, Collapse, Checkbox, Slider, CollapseProps, Tooltip } from 'antd';

import { useEffect, useState } from 'react';
import { CloseOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { catalogStore } from '../../../store/catalog-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';

const { Sider } = Layout;
const { Title } = Typography;

export default observer(function FiltersBlock() {
  const { filtersData, loadFiltersData, resetFilters, applyFilters } = catalogStore;

  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
    document.body.style.overflow = collapsed ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setCollapsed(true);
    document.body.style.overflow = 'auto';
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

  const onWeightChange = (checkedValues: number[]) => {
    setSelectedWeight(checkedValues);
  };

  const onPriceChange = (checkedValues: number[]) => {
    setSelectedPriceRange(checkedValues);
  };

  useEffect(() => {
    const minPrice = filtersData?.minPrice || 0;
    const maxPrice = filtersData?.maxPrice || 0;

    setSelectedPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
  }, [filtersData]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    loadFiltersData();
  }, [loadFiltersData]);

  useEffect(() => {
    const categories = query.getAll('category') || [];
    const colors = query.getAll('color') || [];
    const rating = query
      .getAll('rating')
      .map((str) => Number(str))
      .filter((num) => !Number.isNaN(num) && num >= 0);
    const weight = query
      .getAll('weight')
      .map((str) => Number(str))
      .filter((num) => !Number.isNaN(num) && num >= 0);
    const minPrice =
      (Number(query.get('min_price')) >= 0 && Number(query.get('min_price'))) || filtersData?.minPrice || 0;
    const maxPrice =
      (Number(query.get('max_price')) >= 0 && Number(query.get('max_price'))) || filtersData?.maxPrice || 0;
    applyFilters({
      filters: {
        colors,
        categories,
        rating,
        weight,
        minPrice,
        maxPrice,
      },
    });
    setSelectedCategories(categories);
    setSelectedColors(colors);
    setSelectedRating(rating);
    setSelectedWeight(weight);
    setSelectedPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
  }, [location.pathname, location.search]);

  const handleApplyFilters = () => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        category: selectedCategories,
        color: selectedColors,
        rating: selectedRating.map((num) => String(num)),
        weight: selectedWeight.map((num) => String(num)),
        min_price: String(selectedPriceRange[0]),
        max_price: String(selectedPriceRange[1]),
      }).toString(),
    });
    closeMenu();
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedWeight([]);
    setSelectedRating([]);
    setSelectedPriceRange([filtersData?.minPrice || 0, filtersData?.maxPrice || 0]);
    resetFilters();
    navigate({ pathname: location.pathname, search: '' });
    closeMenu();
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'PRICE',
      className: styles['filter-collapse'],
      children: (
        <>
          <Slider
            range
            step={10}
            tooltip={{ placement: 'top' }}
            defaultValue={selectedPriceRange}
            value={selectedPriceRange}
            min={Math.floor(filtersData?.minPrice || 0)}
            max={Math.ceil(filtersData?.maxPrice || 0)}
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
          options={filtersData?.categories}
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
          WEIGHT (KG)
          <Tooltip title="Maximum weight of the rider" placement="top">
            <InfoCircleOutlined style={{ marginLeft: 8 }} />
          </Tooltip>
        </div>
      ),
      children: (
        <Checkbox.Group
          options={filtersData?.weight}
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
            Filter
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
