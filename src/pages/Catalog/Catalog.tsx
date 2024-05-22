import ProductList from '../../components/ProductList/ProductList';

import styles from './Catalog.module.css';

export default function CatalogPage() {
  return (
    <div className="container">
      <div id="profile-page" className={styles.wrapper}>
        <ProductList />
      </div>
    </div>
  );
}
