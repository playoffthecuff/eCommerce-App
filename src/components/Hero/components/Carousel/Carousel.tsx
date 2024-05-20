import { Carousel as AntCarousel, Button, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './Carousel.module.css';
import userStore from '../../../../store/user-store';

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
    <AntCarousel autoplay autoplaySpeed={5000} className={styles.carousel}>
      <div className={`${styles.slide} ${styles['slide-1']}`}>
        <div className={styles.overlay}>
          <div className={styles['slide-content']}>
            <Title className={styles['hero-title']}>Dear Reviewers!</Title>
            <Paragraph className={styles['hero-description']}>
              Please note, in this project we use our own API Service and do not use Commercetools API
            </Paragraph>
            <div className={styles['buttons-wrapper']}>
              <Button type="primary" href="#/registration" htmlType="button" block className={styles['hero-button']}>
                Registration Page
              </Button>
              <Button type="primary" href="#/login" htmlType="button" block className={styles['hero-button']}>
                Login Page
              </Button>
            </div>
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
            <div className={styles['buttons-wrapper']}>
              <Button type="primary" href="#/registration" htmlType="button" block className={styles['hero-button']}>
                Registration Page
              </Button>
              <Button type="primary" href="#/login" htmlType="button" block className={styles['hero-button']}>
                Login Page
              </Button>
            </div>
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
            <div className={styles['buttons-wrapper']}>
              <Button type="primary" href="#/registration" htmlType="button" block className={styles['hero-button']}>
                Registration Page
              </Button>
              <Button type="primary" href="#/login" htmlType="button" block className={styles['hero-button']}>
                Login Page
              </Button>
            </div>
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
            <div className={styles['buttons-wrapper']}>
              <Button type="primary" href="#/registration" htmlType="button" block className={styles['hero-button']}>
                Registration Page
              </Button>
              <Button type="primary" href="#/login" htmlType="button" block className={styles['hero-button']}>
                Login Page
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AntCarousel>
  );
}

const observableCarousel = observer(Carousel);

export default observableCarousel;
