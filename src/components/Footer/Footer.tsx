import { Layout, Typography } from 'antd';
import classNames from 'classnames';
import cyclistImg from '../../assets/images/cyclist.gif';
import Ticker from '../Ticker/Ticker';
import About from './subComponents/About';
import Contacts from './subComponents/Contacts';
import Social from './subComponents/Social';
import Subscribe from './subComponents/Subscribe';
import Finance from './subComponents/Finance';
import Company from './subComponents/Company';
import Support from './subComponents/Support';
import Technology from './subComponents/Technology';
import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter className={styles.footer}>
      <div className={styles.container}>
        <div className={styles['about-block']}>
          <About />
        </div>
        <div className={styles['contacts-block']}>
          <div className={classNames(styles.separator, styles.top)} />
          <div className={styles.contacts}>
            <Contacts />
            <Finance />
          </div>
        </div>
        <div className={styles['map-block']}>
          <div className={styles.map}>
            <iframe
              width="100%"
              height="100%"
              title="map"
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d521.7935599823968!2d-117.84136357705961!3d33.85918392680692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1717854449733!5m2!1sru!2sru" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
            />
          </div>
        </div>
        <div className={styles['middle-block']}>
          <Ticker reverse content={<img alt="valery cyclist" src={cyclistImg} className={styles.cyclist} />} />
        </div>
        <div className={styles['subscribe-block']}>
          <Social />
          <Subscribe />
          <Typography.Text className={styles.copyright}>© 2024 Cycling Dependency</Typography.Text>
        </div>
        <div className={styles['links-block']}>
          <div className={styles['links-wrapper']}>
            <div className={styles.links}>
              <Company />
            </div>
            <div className={styles.links}>
              <Support />
            </div>
          </div>
        </div>
        <div className={styles['technology-block']}>
          <div className={classNames(styles.separator, styles.bottom)} />
          <div className={styles.technology}>
            <Technology />
          </div>
        </div>
      </div>
    </AntFooter>
  );
}

export default Footer;
