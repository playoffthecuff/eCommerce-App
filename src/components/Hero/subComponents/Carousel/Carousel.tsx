import { Carousel as AntCarousel, Button, Typography } from 'antd';

import styles from './Carousel.module.css';

const { Title, Paragraph } = Typography;
function Carousel() {
  return (
    <div className={styles['carousel-wrapper']}>
      <AntCarousel autoplay autoplaySpeed={5000} className={styles.carousel}>
        <div className={`${styles.slide} ${styles['slide-1']}`} />
        <div className={`${styles.slide} ${styles['slide-2']}`} />
        <div className={`${styles.slide} ${styles['slide-3']}`} />
        <div className={`${styles.slide} ${styles['slide-4']}`} />
      </AntCarousel>
      <div className={styles.overlay}>
        <div className="container">
          <div className={styles['slide-content']}>
            <Title className={styles['hero-title']}>Dear Reviewers!</Title>
            <Paragraph className={styles['hero-description']}>
              Please note, this is the Full Stack project and here we use our own Backend and do not use Commercetools
              API
            </Paragraph>
            <div className={styles['buttons-wrapper']}>
              <Button type="primary" href="#/registration" htmlType="button" block className={styles['hero-button']}>
                Registration Page
              </Button>
              <Button type="primary" href="#/login" htmlType="button" block className={styles['hero-button']}>
                Login Page
              </Button>
              <Button
                type="primary"
                href="https://codefrondlers.store/jsfe23q4/api-docs/"
                target="a_blank"
                htmlType="button"
                block
                className={styles['hero-button']}
              >
                Api Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
