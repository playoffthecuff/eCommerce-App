import { RegistrationForm } from '../../components/RegistrationForm';
import styles from './Registration.module.css';

function Registration() {
  return (
    <div className={styles.wrapper}>
      <RegistrationForm />
    </div>
  );
}

export default Registration;
