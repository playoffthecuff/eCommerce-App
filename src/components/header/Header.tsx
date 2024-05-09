// import { Link } from 'react-router-dom';
import { Typography, Space } from 'antd';
import { EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

import styles from './Header.module.css';

const { Title, Link } = Typography;

function Header() {
  return (
    <header className={styles.header}>
      <Title>Cycles store</Title>
      <div className={styles['link-wrapper']}>
        <Space>
          <Link className={styles['header-link']} href="#/registration">
            <EditTwoTone />
            Sign Up
          </Link>
        </Space>

        <Space>
          <Link className={styles['header-link']} href="#/login">
            <CheckCircleTwoTone />
            Sign In
          </Link>
        </Space>
      </div>
    </header>
  );
}

export default Header;
