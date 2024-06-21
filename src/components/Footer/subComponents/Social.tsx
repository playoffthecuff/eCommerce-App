import { Typography } from 'antd';
import { FacebookOutlined, InstagramOutlined, XOutlined, YoutubeOutlined } from '@ant-design/icons';
import styles from './Social.module.css';

export default function Social() {
  return (
    <div className={styles.wrapper}>
      <Typography.Title level={5} className={styles.title}>
        SOCIAL
      </Typography.Title>
      <div className={styles.content}>
        <a href="https://www.instagram.com" aria-label="Instagram" target="blank">
          <InstagramOutlined />
        </a>
        <a href="https://www.youtube.com" aria-label="Youtube" target="blank">
          <YoutubeOutlined />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" target="blank">
          <FacebookOutlined />
        </a>
        <a href="https://x.com" aria-label="X - ex Twitter" target="blank">
          <XOutlined />
        </a>
      </div>
    </div>
  );
}
