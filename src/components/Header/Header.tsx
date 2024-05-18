import { Typography, Space, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
import styles from './Header.module.css';
import userStore from '../../store/user-store';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const { Title, Paragraph } = Typography;

function Header() {
  return (
    <header className={styles.header}>
      <Title>Cycling Dependency</Title>
      <Paragraph>{userStore.isAuthorized ? 'User is authorized' : 'Please sign in or sign up'}</Paragraph>
      <div className={styles['link-wrapper']}>
        <Space>
          <Button type="link" href="#/registration" icon={<FormOutlined />}>
            Sign Up
          </Button>
        </Space>
        <Space>{userStore.isAuthorized ? <LogoutButton /> : <LoginButton />}</Space>
      </div>
    </header>
  );
}

const observableHeader = observer(Header);

export default observableHeader;
