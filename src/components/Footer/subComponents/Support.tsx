import { Typography } from 'antd';
import styles from './LinksList.module.css';

export default function Support() {
  return (
    <div className={styles.wrapper}>
      <Typography.Text>Support:</Typography.Text>
      <ul className={styles.content}>
        <a href="./">
          <li>Shipping & Returns</li>
        </a>
        <a href="./">
          <li>Warranty</li>
        </a>
        <a href="./">
          <li>Help & FAQ</li>
        </a>
        <a href="./">
          <li>Terms & Conditions</li>
        </a>
        <a href="./">
          <li>Privacy Policy</li>
        </a>
        <a href="./">
          <li>Term of Service</li>
        </a>
      </ul>
    </div>
  );
}
