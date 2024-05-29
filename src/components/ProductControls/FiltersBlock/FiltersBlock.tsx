import { Layout, Typography, Collapse, Checkbox, Slider } from 'antd';

import { useEffect, useState } from 'react';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
// import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { productsStore } from '../../../store/product-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';

// import { Filters } from '../../../types/types';

const { Sider } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

export default observer(function FiltersBlock() {
  const { filters } = productsStore;

  const [collapsed, setCollapsed] = useState(true);

  // const [initFilters, setInitFilters] = useState({});
  // const [appliedFilters, setAppliedFilters] = useState({});

  // Set Initial Filter Values
  // const [minPrice, setMinPrice] = useState<number>(0);
  // const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [colors, setColors] = useState<string[]>([]);
  const [weight, setWeight] = useState<number[]>([]);
  const [rating, setRating] = useState<number[]>([]);
  // const [wheelBases, setWheelBases] = useState<number[]>([]);
  // const [frameSizes, setFrameSizes] = useState<string[]>([]);
  // const [rating, setRating] = useState<[number, number]>([0, 5]);

  // Selected Filter Values
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 0]);
  // const [selectedWheelBases, setSelectedWheelBases] = useState<number[]>([]);
  // const [selectedFrameSizes, setSelectedFrameSizes] = useState<string[]>([]);

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
    setCategories(filters?.categories || []);
    setColors(filters?.colors || []);
    setWeight(filters?.weight || []);
    setRating(filters?.rating || []);
    setPriceRange([filters?.minPrice || 0, filters?.maxPrice || 1000]);
  }, [filters]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const applyFilters = () => {
    productsStore.applyFilters({
      colors: selectedColors,
      categories: selectedCategories,
      rating: selectedRating,
      weight: selectedWeight,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
    });

    closeMenu();
  };

  // const resetFilters = () => {
  //   // Сбрасываем фильтры до состояния перед применением
  //   setSelectedColors(appliedFilters.colors || []);
  //   // Закрываем меню
  //   closeMenu();
  // };

  return (
    <div className={styles['filters-block-wrapper']}>
      <div className={`${styles.overlay} ${collapsed ? styles.hidden : ''}`} onClick={closeMenu} />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ left: collapsed ? '-100%' : '0', position: 'fixed', height: '100vh', top: '48px' }}
      >
        <div className={styles['menu-header']}>
          <Title level={2} className={styles['menu-title']}>
            Filter
          </Title>
          <CloseOutlined className={styles['close-button']} onClick={closeMenu} />
        </div>
        <Collapse bordered={false} className={styles['filter-collapse']}>
          <Panel header="PRICE" key="1" className={styles['filter-panel']}>
            <Slider
              range
              defaultValue={[priceRange[0], priceRange[1]]}
              min={priceRange[0]}
              max={priceRange[1]}
              onChange={onPriceChange}
            />
            <div className={styles['price-range']}>
              ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
            </div>
          </Panel>
          <Panel header="CATEGORIES" key="2" className={styles['filter-panel']}>
            <Checkbox.Group options={categories} className={styles['filter-group']} onChange={onCategoryChange} />
          </Panel>
          <Panel header="COLORS" key="3" className={styles['filter-panel']}>
            <Checkbox.Group options={colors} className={styles['filter-group']} onChange={onColorChange} />
          </Panel>
          <Panel header="WEIGHT" key="4" className={styles['filter-panel']}>
            <Checkbox.Group options={weight} className={styles['filter-group']} onChange={onWeightChange} />
          </Panel>
          <Panel header="RATING" key="5" className={styles['filter-panel']}>
            <Checkbox.Group options={rating} className={styles['filter-group']} onChange={onRatingChange} />
          </Panel>
          {/* <Panel header="WHEEL BASE" key="5" className={styles['filter-panel']}>
            <Checkbox.Group options={wheelBases.map(String)} className={styles['filter-group']} />
          </Panel> */}
          {/* <Panel header="FRAME SIZE" key="6" className={styles['filter-panel']}>
            <Checkbox.Group options={frameSizes} />
          </Panel> */}
        </Collapse>
        <div className={styles['apply-button-wrapper']}>
          <CustomButton style={{ width: '100px' }} variety="common" htmlType="button" onClick={applyFilters}>
            Apply
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
