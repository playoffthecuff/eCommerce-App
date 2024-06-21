import { Typography } from 'antd';
import { AlipayOutlined } from '@ant-design/icons';
import styles from './Finance.module.css';
import { BitcoinIcon, EtheriumIcon, USDCIcon } from '../../CustomIcons/CustomIcons';

export default function Finance() {
  return (
    <div className={styles.wrapper}>
      <Typography.Text className={styles.title}>We accept:</Typography.Text>
      <div className={styles.content}>
        <a href="https://www.alipay.com" aria-label="Alipay" target="blank">
          <AlipayOutlined />
        </a>
        <a href="https://bitcoin.org" aria-label="Bitcoin" target="blank">
          <BitcoinIcon />
        </a>
        <a href="https://etherium.org" aria-label="Etherium" target="blank">
          <EtheriumIcon />
        </a>
        <a href="https://www.circle.com" aria-label="USDC" target="blank">
          <USDCIcon />
        </a>
      </div>
    </div>
  );
}
