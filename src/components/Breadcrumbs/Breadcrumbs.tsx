import { observer } from 'mobx-react-lite';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import productStore from '../../store/product-store';
import { LogoIcon } from '../CustomIcons/CustomIcons';
import styles from './Breadcrumbs.module.css';
import { BootState } from '../../types/boot-state';

export const Breadcrumbs = observer(() => {
  const location = useLocation();
  const [query] = useSearchParams();
  const { product, bootState } = productStore;

  const isCatalog = location.pathname.startsWith('/catalog');
  const isProductDetailsPage =
    location.pathname.startsWith('/product') && product && bootState !== BootState.InProgress;
  if (!isCatalog && !isProductDetailsPage) {
    return null;
  }

  const categories = query.getAll('category');
  let currentCategory: string | undefined;
  if (categories.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    currentCategory = categories[0];
  }

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">
        <LogoIcon /> Home
      </Link>
      <span> / </span>
      {isProductDetailsPage || currentCategory ? <Link to="/catalog">Catalog</Link> : 'Catalog'}
      {currentCategory && (
        <>
          <span> / </span>
          {currentCategory[0].toUpperCase() + currentCategory.slice(1)}
        </>
      )}
      {isProductDetailsPage && (
        <>
          <span> / </span>
          <Link to={`/catalog?category=${product.category}`}>
            {product.category[0].toUpperCase() + product.category.slice(1)}
          </Link>
          <span> / </span>
          {product.title}
        </>
      )}
    </div>
  );
});
