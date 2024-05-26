import { Typography } from 'antd';

import ProductList from '../../components/ProductList/ProductList';
import ProductControls from '../../components/ProductControls/ProductControls';

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
      <ProductControls />
      <div className="container">
        <div id="profile-page" className="wrapper">
          <section>
            <ProductList />
          </section>
        </div>
      </div>
    </>
  );
}
