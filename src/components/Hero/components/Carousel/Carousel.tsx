import { Carousel as AntCarousel } from 'antd';

import styles from './Carousel.module.css';

const contentStyle: React.CSSProperties = {
  height: '100%',
  color: '#fff',
  textAlign: 'center',
  // lineHeight: '80vh',
  // background: '#364d79',
};

function Carousel() {
  return (
    <AntCarousel className={styles.carousel}>
      <div className={`${styles.slide} ${styles['slide-1']}`}>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div className={`${styles.slide} ${styles['slide-2']}`}>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div className={`${styles.slide} ${styles['slide-3']}`}>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div className={`${styles.slide} ${styles['slide-4']}`}>
        <h3 style={contentStyle}>4</h3>
      </div>
    </AntCarousel>
  );
}

export default Carousel;
