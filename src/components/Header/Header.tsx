import { Layout, Typography, Space } from 'antd';
import { EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

import HeaderMenu from '../HeaderMenu/HeaderMenu';

import logo from '../../assets/images/pure-cycles-logo.avif';
import styles from './Header.module.css';

const { Link } = Typography;
const { Header: AntHeader } = Layout;

function Header() {
  return (
    <AntHeader className={styles.header}>
      <Link href="#/main">
        <div className={styles['logo-wrapper']}>
          <img src={logo} alt="Pure Cycles Logo" />
        </div>
      </Link>
      <HeaderMenu />

      <div className={styles['link-wrapper']}>
        <Space>
          <Link className={styles['header-link']} href="#/registration">
            <EditTwoTone twoToneColor="#9f2d11" />
            Sign Up
          </Link>
        </Space>

        <Space>
          <Link className={styles['header-link']} href="#/login">
            <CheckCircleTwoTone twoToneColor="#9f2d11" />
            Sign In
          </Link>
        </Space>
      </div>
    </AntHeader>
  );
}

export default Header;
