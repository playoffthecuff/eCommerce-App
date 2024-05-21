import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import styles from './Footer.module.css';

import schoolLogo from '../../assets/images/school-logo.svg';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }} className={styles.footer}>
      <div>
        <a href="https://rs.school/" aria-label="RS School" target="_blank" rel="noreferrer">
          <img src={schoolLogo} alt="RS School Logo" style={{ width: '150px' }} />
        </a>
      </div>
      <div className={styles['footer-links']}>
        <a
          href="https://github.com/kat2709"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile kat2709"
          className={styles['footer-link']}
        >
          <GithubOutlined style={{ fontSize: '24px' }} />
          <span>kat2709</span>
        </a>
        <a
          href="https://github.com/playoffthecuff"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile playoffthecuff"
          className={styles['footer-link']}
        >
          <GithubOutlined style={{ fontSize: '24px' }} />
          <span>playoffthecuff</span>
        </a>
        <a
          href="https://github.com/hrybach-oleksiy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile hrybach-oleksiy"
          className={styles['footer-link']}
        >
          <GithubOutlined style={{ fontSize: '24px' }} />
          <span>hrybach-oleksiy</span>
        </a>
      </div>
      <div className={styles['footer-copyright']}>
        <p className={styles['footer-copyright-text']}>&copy; {new Date().getFullYear()}</p>
      </div>
    </AntFooter>
  );
}

export default Footer;
