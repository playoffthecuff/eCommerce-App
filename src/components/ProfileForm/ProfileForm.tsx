import { Tabs } from 'antd';
import { MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './ProfileForm.module.css';
import userStore from '../../store/user-store';
import { BootState } from '../../enums';
import { PasswordData, PersonalData } from './sub-componetns';

export const ProfileForm = observer(() => {
  const navigate = useNavigate();
  const isAuthorized = userStore.isAuthorized || Boolean(userStore.user);

  if (userStore.bootState === BootState.InProgress) return null;
  if (userStore.bootState === BootState.Success && !isAuthorized) {
    navigate('/login');
    return null;
  }

  return (
    <Tabs
      className={styles.tabs}
      items={[
        { icon: <SolutionOutlined />, title: 'Pesonal', children: <PersonalData /> },
        { icon: <UnlockOutlined />, title: 'Password', children: <PasswordData /> },
        { icon: <MailOutlined />, title: 'Addresses', children: <PersonalData /> },
      ].map(({ icon, title, children }) => {
        return {
          key: title,
          label: title,
          children,
          icon,
        };
      })}
    />
  );
});
