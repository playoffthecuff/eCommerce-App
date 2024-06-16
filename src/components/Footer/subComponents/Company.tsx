import { Typography } from 'antd';
import styles from './LinksList.module.css';

export default function Company() {
  return (
    <div className={styles.wrapper}>
      <Typography.Text>Company:</Typography.Text>
      <ul className={styles.content}>
        <a href="./#/main">
          <li>Main</li>
        </a>
        <a href="./#/catalog">
          <li>Catalog</li>
        </a>
        <a href="./#/about">
          <li>About Us</li>
        </a>
        <a href="./#/blog">
          <li>Blog</li>
        </a>
      </ul>
    </div>
  );
}
