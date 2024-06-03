import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';
import productStore from '../../store/product-store';
import { LogoIcon } from '../CustomIcons/CustomIcons';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = observer(() => {
  const location = useLocation();
  const { product } = productStore;

  const isCatalog = location.pathname.startsWith('/catalog');
  const isProductDetailsPage = location.pathname.startsWith('/product') && product;
  if (!isCatalog && !isProductDetailsPage) {
    return null;
  }

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">
        <LogoIcon /> Home
      </Link>
      <Separator />
      {isProductDetailsPage ? <Link to="/catalog">Catalog</Link> : 'Catalog'}
      {isProductDetailsPage && (
        <>
          <Separator />
          <Link to={`/catalog?category=${product.category}`}>
            {/* TODO: use CSS to capitalise? */}
            {product.category[0].toUpperCase() + product.category.slice(1)}
          </Link>
          <Separator />
          {product.title}
        </>
      )}
    </div>
  );
});

function Separator() {
  return <> / </>;
}
