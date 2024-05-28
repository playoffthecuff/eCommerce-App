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
  const { allProducts } = productsStore;

  const [collapsed, setCollapsed] = useState(true);

  // Set Initial Filter Values
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [colors, setColors] = useState<string[]>([]);
  const [wheelBases, setWheelBases] = useState<number[]>([]);
  const [frameSizes, setFrameSizes] = useState<string[]>([]);
  // const [rating, setRating] = useState<[number, number]>([0, 5]);

  // Selected Filter Values
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
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

  // const onCategoryChange = (checkedValues: string[]) => {
  //   setSelectedCategories(checkedValues);
  // };

  const onColorChange = (checkedValues: string[]) => {
    setSelectedColors(checkedValues);
    console.log(selectedColors);
    console.log(frameSizes);
  };

  // const onWheelBaseChange = (checkedValues: number[]) => {
  //   setSelectedWheelBases(checkedValues);
  // };

  // const onFrameSizeChange = (checkedValues: string[]) => {
  //   setSelectedFrameSizes(checkedValues);
  // };

  // const onPriceChange = (value: [number, number]) => {
  //   setPriceRange(value);
  // };

  // const onRatingChange = (value: number) => {
  //   setRating(value);
  // };

  // const handleApplyFilters = () => {
  //   applyFilters(filters);
  // };

  useEffect(() => {
    const uniqueValues = <T,>(arr: T[]): T[] => [...new Set(arr)];

    const filtersCategories = uniqueValues(allProducts.map((product) => product.category || ''));
    const filtersColors = uniqueValues(allProducts.map((product) => product.color || ''));
    const filtersWheelBases = uniqueValues(
      allProducts.flatMap((product) => Object.values(product.sizing).map((size) => size['Wheel Base']))
    );
    const filtersFrameSizes = uniqueValues(Object.keys(allProducts.flatMap((product) => Object.keys(product.sizing))));

    const filtersMinPrice = Math.min(...allProducts.map((product) => product.price || 0));
    const filtersMaxPrice = Math.max(...allProducts.map((product) => product.price || 0));

    setCategories(filtersCategories);
    setColors(filtersColors);
    setWheelBases(filtersWheelBases);
    setFrameSizes(filtersFrameSizes);
    setPriceRange([filtersMinPrice, filtersMaxPrice]);
  }, [allProducts]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const applyFilters = () => {
    productsStore.applyFilters({
      colors: selectedColors,
    });
    closeMenu();
  };

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
          <Panel header="PRICE" key="3" className={styles['filter-panel']}>
            <Slider range defaultValue={[priceRange[0], priceRange[1]]} min={priceRange[0]} max={priceRange[1]} />
            <div className={styles['price-range']}>
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </Panel>
          <Panel header="CATEGORIES" key="1" className={styles['filter-panel']}>
            <Checkbox.Group options={categories} className={styles['filter-group']} />
          </Panel>
          <Panel header="COLORS" key="2" className={styles['filter-panel']}>
            <Checkbox.Group options={colors} className={styles['filter-group']} onChange={onColorChange} />
          </Panel>
          {/* <Panel header="RATING" key="4" className={styles['filter-panel']}>
            <Slider min={0} max={5} step={0.1} />
          </Panel> */}
          <Panel header="WHEEL BASE" key="5" className={styles['filter-panel']}>
            <Checkbox.Group options={wheelBases.map(String)} className={styles['filter-group']} />
          </Panel>
          {/* <Panel header="FRAME SIZE" key="6" className={styles['filter-panel']}>
            <Checkbox.Group options={frameSizes} />
          </Panel> */}
          {/* <Button type="primary" onClick={applyFilters}>
                Apply Filters
            </Button> */}
        </Collapse>
        {/* <Collapse bordered={false} defaultActiveKey={['1']} className={styles['filter-collapse']}>
          <Panel header="PRICE" key="0" className={styles['filter-panel']}>
            <div className={styles['filter-item']}>
              <Slider
                range
                min={minimumPrice}
                max={maximumPrice}
                step={100}
                defaultValue={[minimumPrice, maximumPrice]}
                onChange={(value) => {
                  handlePriceChange(value);
                  handleFilterPriceChange(value[0], value[1]);
                }}
                value={priceRange}
              />
              <div className={styles['price-range']}>
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </Panel>
          {Object.entries(filterData).map(([category, items], index) => (
            <Panel header={category} key={index.toString() + 1} className={styles['filter-panel']}>
              {items.map((item) => (
                <div key={item.key} className={styles['filter-item']}>
                  <Checkbox data-name={item.label}>
                    {item.label} ({item.count})
                  </Checkbox>
                </div>
              ))}
            </Panel>
          ))}
        </Collapse> */}
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
