import { Link } from 'react-router-dom';
import { Space } from 'antd';

import styles from './Login.module.css';

function Login() {
  return (
    <>
      <div>Login</div>
      <div className={styles['link-wrapper']}>
        <Space>
          <Link to="/registration">Sign Up</Link>
          <Link to="/main">Login</Link>
        </Space>
      </div>
    </>
  );
}

export default Login;
