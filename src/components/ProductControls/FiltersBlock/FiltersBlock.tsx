import { Layout, Typography, Collapse, Checkbox, Slider } from 'antd';

import { useEffect, useState } from 'react';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
// import { productsStore } from '../../store/product-store';
import styles from './FiltersBlock.module.css';
import CustomButton from '../../CustomButton/CustomButton';

const { Sider } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const filterData = {
  'PRODUCT TYPE': [
    { label: 'Bicycles', count: 6, key: 1 },
    { label: 'Coaster Bikes', count: 1, key: 2 },
    { label: 'Pure City Bikes', count: 2, key: 3 },
    { label: 'Urban Bikes', count: 1, key: 4 },
  ],
  BRAND: [{ label: 'Pure Cycles', count: 10, key: 5 }],
  AVAILABILITY: [
    { label: 'In stock', count: 10, key: 6 },
    { label: 'Out of stock', count: 1, key: 7 },
  ],
  'POSTAL CODE PATTERN': [
    { label: '9999', count: 10, key: 7 },
    { label: '99999', count: 5, key: 8 },
    { label: '999999', count: 8, key: 9 },
  ],
};

export default observer(function FiltersBlock() {
  const [collapsed, setCollapsed] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);

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
                min={0}
                max={1000}
                defaultValue={[0, 1000]}
                onChange={handlePriceChange}
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
                  <Checkbox>
                    {item.label} ({item.count})
                  </Checkbox>
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
        <div className={styles['apply-button-wrapper']}>
          <CustomButton style={{ width: '100px' }} variety="common" htmlType="button">
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
