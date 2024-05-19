import { Carousel as AntCarousel, Typography } from 'antd';

import styles from './Carousel.module.css';

// const contentStyle: React.CSSProperties = {
//   height: '100%',
//   color: '#fff',
//   textAlign: 'center',
//   // lineHeight: '80vh',
//   // background: '#364d79',
// };

const { Title, Paragraph } = Typography;

function Carousel() {
  return (
    <AntCarousel autoplay className={styles.carousel}>
      <div className={`${styles.slide} ${styles['slide-1']}`}>
        <div className={styles.overlay}>
          <div className={styles['slide-content']}>
            <Title className={styles['hero-title']}>Dear Reviewers!</Title>
            <Paragraph className={styles['hero-description']}>
              Please note, in this project we use our own API Service and do not use Commercetools API
            </Paragraph>
          </div>
        </div>
      </div>
      <div className={`${styles.slide} ${styles['slide-2']}`}>
        <div className={styles.overlay}>
          <div className={styles['slide-content']}>
            <Title className={styles['hero-title']}>Dear Reviewers!</Title>
            <Paragraph className={styles['hero-description']}>
              Please note, in this project we use our own API Service and do not use Commercetools API
            </Paragraph>
          </div>
        </div>
      </div>
      <div className={`${styles.slide} ${styles['slide-3']}`}>
        <div className={styles.overlay}>
          <div className={styles['slide-content']}>
            <Title className={styles['hero-title']}>Dear Reviewers!</Title>
            <Paragraph className={styles['hero-description']}>
              Please note, in this project we use our own API Service and do not use Commercetools API
            </Paragraph>
          </div>
        </div>
      </div>
      <div className={`${styles.slide} ${styles['slide-4']}`}>
        <div className={styles.overlay}>
          <div className={styles['slide-content']}>
            <Title className={styles['hero-title']}>Dear Reviewers!</Title>
            <Paragraph className={styles['hero-description']}>
              Please note, in this project we use our own API Service and do not use Commercetools API
            </Paragraph>
          </div>
        </div>
      </div>
    </AntCarousel>
  );
}

export default Carousel;
