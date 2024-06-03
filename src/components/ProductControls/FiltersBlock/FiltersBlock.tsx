import { Layout, Typography, Collapse, Checkbox, Slider, CollapseProps, Tooltip } from 'antd';

import { useEffect, useState } from 'react';
import { CloseOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
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
    console.log(checkedValues);
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
    return () => {
      resetFilters();
    };
  }, [location.pathname]);

  const handleApplyFilters = () => {
    applyFilters({
      filters: {
        colors: selectedColors,
        categories: selectedCategories,
        rating: selectedRating,
        weight: selectedWeight,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1],
      },
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
