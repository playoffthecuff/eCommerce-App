import { Layout } from 'antd';
import { GithubOutlined, FacebookFilled, DiscordFilled, InstagramFilled } from '@ant-design/icons';

import { FooterLogo } from './subComponents/FooterLogo/FooterLogo';

import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }} className={styles.footer}>
      <div className={styles['footer-logo']}>
        <a href="https://rs.school/" aria-label="RS School" target="_blank" rel="noreferrer">
          <div className={styles['logo-wrapper']}>
            <FooterLogo className={styles['footer-icon']} />
          </div>
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
          <GithubOutlined style={{ fontSize: '32px' }} />
          <span>kat2709</span>
        </a>
        <a
          href="https://github.com/playoffthecuff"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile playoffthecuff"
          className={styles['footer-link']}
        >
          <GithubOutlined style={{ fontSize: '32px' }} />
          <span>playoffthecuff</span>
        </a>
        <a
          href="https://github.com/hrybach-oleksiy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile hrybach-oleksiy"
          className={styles['footer-link']}
        >
          <GithubOutlined style={{ fontSize: '32px' }} />
          <span>hrybach-oleksiy</span>
        </a>
      </div>
      <div className={styles['footer-copyright']}>
        <p className={styles['footer-copyright-text']}>&copy; {new Date().getFullYear()}</p>
      </div>
      <div className={styles['footer-socials']}>
        <a
          href="https://github.com/kat2709"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile kat2709"
          className={styles['footer-link']}
        >
          <FacebookFilled style={{ fontSize: '42px' }} />
        </a>
        <a
          href="https://github.com/playoffthecuff"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile playoffthecuff"
          className={styles['footer-link']}
        >
          <DiscordFilled style={{ fontSize: '42px' }} />
        </a>
        <a
          href="https://github.com/hrybach-oleksiy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile hrybach-oleksiy"
          className={styles['footer-link']}
        >
          <InstagramFilled style={{ fontSize: '42px' }} />
        </a>
      </div>
    </AntFooter>
  );
}

export default Footer;
