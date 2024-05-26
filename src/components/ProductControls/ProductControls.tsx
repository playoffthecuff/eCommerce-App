import FiltersBlock from './FiltersBlock/FiltersBlock';

import styles from './ProductControls.module.css';

export default function ProductControls() {
  return (
    <section className={styles['product-controls']}>
      <FiltersBlock />
    </section>
  );
}
