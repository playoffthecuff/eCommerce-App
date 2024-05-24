import { Carousel as AntCarousel, Typography } from 'antd';

import classNames from 'classnames';
import styles from './Carousel.module.css';
import CustomButton from '../../../CustomButton/CustomButton';

const { Title, Paragraph } = Typography;
function Carousel() {
  return (
    <div className={styles['carousel-wrapper']}>
      <AntCarousel autoplay autoplaySpeed={5000} className={styles.carousel}>
        <div className={classNames(styles.slide, styles.slide1)} />
        <div className={classNames(styles.slide, styles.slide2)} />
        <div className={classNames(styles.slide, styles.slide3)} />
        <div className={classNames(styles.slide, styles.slide4)} />
      </AntCarousel>
      <div className={styles.overlay}>
        <div className={styles['slide-content']}>
          <Title className={styles['hero-title']}>Dear Reviewers!</Title>
          <Paragraph className={styles['hero-description']}>
            Please note, this is the Full Stack project and here we use our own Backend and do not use Commercetools API
          </Paragraph>
          <div className={styles['buttons-wrapper']}>
            <CustomButton variety="common" href="#/registration" htmlType="button" style={{ width: '170px' }}>
              Registration Page
            </CustomButton>
            <CustomButton variety="common" href="#/login" htmlType="button" style={{ width: '170px' }}>
              Login Page
            </CustomButton>
            <CustomButton
              style={{ width: '170px' }}
              variety="common"
              href="https://codefrondlers.store/jsfe23q4/api-docs/"
              target="a_blank"
              htmlType="button"
            >
              Api Documentation
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
