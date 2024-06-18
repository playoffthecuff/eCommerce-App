import { Layout, Typography, Collapse } from 'antd';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_PAGE, MAX_PRODUCT_PRICE, catalogStore } from '../../../store/catalog-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';
import { getFilterItems } from './subComponents/FilterItems';
import { useFilters } from './useFilters';

const { Sider } = Layout;
const { Title } = Typography;

export default observer(function FiltersBlock() {
  const { filtersData, loadFiltersData, resetFilters } = catalogStore;

  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);

  const {
    selectedCategories,
    setSelectedCategories,
    selectedColors,
    setSelectedColors,
    selectedRating,
    setSelectedRating,
    selectedWeight,
    setSelectedWeight,
    selectedPriceRange,
    setSelectedPriceRange,
    updateQuery,
  } = useFilters(filtersData);

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

  // useEffect(() => {
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  useEffect(() => {
    loadFiltersData();
  }, [loadFiltersData]);

  const handleApplyFilters = useCallback(() => {
    updateQuery('category', selectedCategories);
    updateQuery('color', selectedColors);
    updateQuery('weight', selectedWeight.map(String));
    updateQuery('rating', String(selectedRating));
    updateQuery('min_price', String(selectedPriceRange[0]));
    updateQuery('max_price', String(selectedPriceRange[1]));
    updateQuery('page', String(DEFAULT_PAGE));
    closeMenu();
  }, [selectedCategories, selectedColors, selectedRating, selectedWeight, selectedPriceRange]);

  const handleResetFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedWeight([]);
    setSelectedRating(1);
    setSelectedPriceRange([filtersData?.minPrice || 0, filtersData?.maxPrice || MAX_PRODUCT_PRICE]);
    resetFilters();
    navigate({ pathname: location.pathname, search: '' });
    closeMenu();
  }, [filtersData, location.pathname, navigate]);

  const items = useMemo(
    () =>
      getFilterItems({
        selectedPriceRange,
        onPriceChange: setSelectedPriceRange,
        selectedCategories,
        onCategoryChange: setSelectedCategories,
        filtersData,
        selectedColors,
        onColorChange: setSelectedColors,
        selectedWeight,
        onWeightChange: setSelectedWeight,
        selectedRating,
        onRatingChange: setSelectedRating,
      }),
    [selectedPriceRange, selectedCategories, selectedColors, selectedWeight, selectedRating, filtersData]
  );

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
