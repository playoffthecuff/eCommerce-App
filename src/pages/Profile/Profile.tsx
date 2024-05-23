import ProfilePage from '../../components/ProfileForm/ProfileForm';
import styles from './Profile.module.css';

function Profile() {
  return (
    <div className="container">
      <div id="profile-page" className={styles.wrapper}>
        <ProfilePage />
      </div>
    </div>
  );
}

export default Profile;
