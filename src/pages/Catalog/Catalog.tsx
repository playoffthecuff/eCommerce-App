import { Typography } from 'antd';

import ProductList from '../../components/ProductList/ProductList';
import ProductControls from '../../components/ProductControls/ProductControls';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

import styles from './Catalog.module.css';

const { Title, Paragraph } = Typography;

export default function CatalogPage() {
  return (
    <>
      <div className={styles['catalog-background']}>
        <div className={styles.overlay}>
          <div className={styles['catalog-description']}>
            <Title className={styles['catalog-title']}>Bicycles</Title>
            <Paragraph className={styles['catalog-description']}>Bicycles for all occasions</Paragraph>
          </div>
        </div>
      </div>
      <div className="container">
        <Breadcrumbs />
      </div>
      <ProductControls />
      <div className="container">
        <div className="wrapper">
          <section style={{ width: '100%' }}>
            <ProductList />
          </section>
        </div>
      </div>
    </>
  );
}
