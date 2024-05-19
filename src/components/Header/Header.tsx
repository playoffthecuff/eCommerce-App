import { Layout, Typography } from 'antd';
// import { EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
// import HeaderMenu from '../HeaderMenu/HeaderMenu';

import logo from '../../assets/images/pure-cycles-logo.avif';
import styles from './Header.module.css';
// import userStore from '../../store/user-store';
// import LogoutButton from './LogoutButton';
// import LoginButton from './LoginButton';

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
      {/* <HeaderMenu /> */}

      {/* <div className={styles['link-wrapper']}>
        <Space>
          <Button type="link" href="#/registration" icon={<FormOutlined twoToneColor="#9f2d11" />}>
            Sign Up
          </Button>
        </Space>
        <Space>{userStore.isAuthorized ? <LogoutButton /> : <LoginButton />}</Space>
      </div> */}
    </AntHeader>
  );
}

const observableHeader = observer(Header);

export default observableHeader;
