import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
}

export default Login;
