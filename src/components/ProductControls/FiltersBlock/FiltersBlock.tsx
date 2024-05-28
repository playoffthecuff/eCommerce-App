import { Layout, Typography, Collapse, Checkbox, Slider } from 'antd';

import { useEffect, useState } from 'react';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
// import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { productsStore } from '../../../store/product-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';

import { Filters } from '../../../types/types';

const { Sider } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

// interface Item {
//   label: string | string[];
//   count: number;
//   key: number;
// }

// type FilterCategory = 'CATEGORY' | 'COLOR' | 'RATING' | 'WEIGHT' | 'WHEEL BASE' | 'FRAME SIZE';

export default observer(function FiltersBlock() {
  const { allProducts, applyFilters } = productsStore;
  const minimumPrice = Math.min(...allProducts.map((product) => product.price));
  const maximumPrice = Math.max(...allProducts.map((product) => product.price));
  const [collapsed, setCollapsed] = useState(true);
  const [priceRange, setPriceRange] = useState([minimumPrice, maximumPrice]);
  const [filters, setFilters] = useState<Filters>(null);

  const filterData = {
    CATEGORY: [...new Set(allProducts.map((product) => product.category))].map((category, index) => ({
      label: category,
      count: allProducts.filter((product) => product.category === category).length,
      key: index + 1,
    })),
    COLOR: [...new Set(allProducts.map((product) => product.color))].map((color, index) => ({
      label: color,
      count: allProducts.filter((product) => product.color === color).length,
      key: index + 100,
    })),
    RATING: [...new Set(allProducts.map((product) => product.rating))].map((rating, index) => ({
      label: rating.toString(),
      count: allProducts.filter((product) => product.rating === rating).length,
      key: index + 200,
    })),
    WEIGHT: [...new Set(allProducts.map((product) => product.weight))].map((weight, index) => ({
      label: `${weight} kg`,
      count: allProducts.filter((product) => product.weight === weight).length,
      key: index + 300,
    })),
    // 'WHEEL BASE': [
    //   ...new Set(allProducts.flatMap((product) => Object.values(product.sizing).map((s) => s['Wheel Base']))),
    // ].map((wheelBase, index) => ({
    //   label: `${wheelBase} mm`,
    //   count: allProducts.filter((product) => Object.values(product.sizing).some((s) => s['Wheel Base'] === wheelBase))
    //     .length,
    //   key: index + 400,
    // })),
    // 'FRAME SIZE': [...new Set(allProducts.flatMap((product) => Object.keys(product.sizing)))].map(
    //   (frameSize, index) => ({
    //     label: frameSize,
    //     count: allProducts.filter((product) => Object.keys(product.sizing).includes(frameSize)).length,
    //     key: index + 500,
    //   })
    // ),
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
    document.body.style.overflow = collapsed ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setCollapsed(true);
    document.body.style.overflow = 'auto';
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  // const handleCategoryChange = (selectedCategories: string[]): void => {
  //   setFilters({ ...filters, category: selectedCategories });
  // };

  // const handleColorChange = (event: CheckboxChangeEvent): void => {
  //   const currentCheckbox = event.target as HTMLInputElement;

  //   if (currentCheckbox.checked) {
  //     const selectedColor = currentCheckbox.value;

  //     if (selectedColor) {
  //       setFilters({ ...filters, color: [selectedColor] });
  //     }
  //   }

  //   console.log(filters);
  // };

  // const handleRatingChange = (selectedRating: number): void => {
  //   setFilters({ ...filters, rating: selectedRating });
  // };

  // const handleWeightChange = (selectedWeight: number): void => {
  //   setFilters({ ...filters, weight: selectedWeight });
  // };

  // const handleWheelBaseChange = (minBase: number, maxBase: number): void => {
  //   setFilters({ ...filters, minBase, maxBase });
  // };

  const handleFilterPriceChange = (minPrice: number, maxPrice: number): void => {
    setFilters({ ...filters, minPrice, maxPrice });
  };

  // const handleFrameSizeChange = (selectedFrameSizes: string[]): void => {
  //   setFilters({ ...filters, frameSize: selectedFrameSizes });
  // };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
        <Collapse bordered={false} defaultActiveKey={['1']} className={styles['filter-collapse']}>
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
        </Collapse>
        <div className={styles['apply-button-wrapper']}>
          <CustomButton style={{ width: '100px' }} variety="common" htmlType="button" onClick={handleApplyFilters}>
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
