import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import { RSSIcon } from '../CustomIcons/CustomIcons';

import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter className={styles.footer}>
      <div className={styles.container}>
        <div className={styles['side-block']}>
          <a
            href="https://rs.school/"
            className={classNames(styles.link, styles.rss)}
            aria-label="RS School"
            target="_blank"
            rel="noreferrer"
          >
            <RSSIcon />
          </a>
        </div>
        <div className={styles['center-block']}>
          <a
            href="https://github.com/playoffthecuff"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile playoffthecuff"
            className={styles.link}
          >
            <GithubOutlined style={{ fontSize: '24px' }} />
            <span>Evgenii</span>
          </a>
          <a
            href="https://github.com/kat2709"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile kat2709"
            className={styles.link}
          >
            <GithubOutlined style={{ fontSize: '24px' }} />
            <span>Katerina</span>
          </a>
          <a
            href="https://github.com/hrybach-oleksiy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile hrybach-oleksiy"
            className={styles.link}
          >
            <GithubOutlined style={{ fontSize: '24px' }} />
            <span>Oleksiy</span>
          </a>
        </div>
        <div className={styles['side-block']}>
          <p>&copy; 2024</p>
        </div>
      </div>
    </AntFooter>
  );
}

export default Footer;
