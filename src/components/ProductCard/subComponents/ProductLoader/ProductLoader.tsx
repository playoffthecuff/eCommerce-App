import styles from './ProductLoader.module.css';

function BikeSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles['skeleton-image']} />
      <div className={styles['skeleton-details']}>
        <div className={styles['skeleton-name']} />
        <div className={styles['skeleton-brand']} />
        <div className={styles['skeleton-price']} />
      </div>
    </div>
  );
}

export default BikeSkeleton;
