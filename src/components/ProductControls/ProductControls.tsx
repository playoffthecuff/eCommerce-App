import classNames from 'classnames';

import FiltersBlock from './FiltersBlock/FiltersBlock';
import SearchBlock from './SearchBlock/SearchBlock';

import styles from './ProductControls.module.css';

export default function ProductControls() {
  return (
    <section className={styles['product-controls']}>
      <div className={classNames('container', styles['product-controls-wrapper'])}>
        <FiltersBlock />
        <SearchBlock />
      </div>
    </section>
  );
}
