import { Link } from 'react-router-dom';

import styles from './Login.module.css';

function Login() {
  return (
    <>
      <div>Login</div>
      <div className={styles['link-wrapper']}>
        <Link to="/registration">Sign Up</Link>
        <Link to="/main">Login</Link>
      </div>
    </>
  );
}

export default Login;
