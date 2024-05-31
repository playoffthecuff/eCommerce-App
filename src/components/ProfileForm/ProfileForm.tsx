import { Tabs } from 'antd';
import { FormOutlined, MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './ProfileForm.module.css';
import userStore from '../../store/user-store';
import { BootState } from '../../enums';
import { PasswordData, PersonalData } from './sub-componetns';
import { Addresses } from './sub-componetns/Address';
import { AddressType } from '../../types/authorization-response';

export const ProfileForm = observer(() => {
  const navigate = useNavigate();
  const isAuthorized = userStore.isAuthorized || Boolean(userStore.user);

  if (userStore.bootState === BootState.Success && !isAuthorized) {
    navigate('/login');
    return null;
  }
  if (userStore.bootState === BootState.InProgress || !userStore.user) {
    return null;
  }

  return (
    <Tabs
      className={styles.tabs}
      items={[
        { icon: <SolutionOutlined />, title: 'Pesonal', children: <PersonalData /> },
        { icon: <UnlockOutlined />, title: 'Password', children: <PasswordData /> },
        {
          icon: <MailOutlined />,
          title: 'Shipping',
          children: (
            <Addresses
              title="Shipping Addresses:"
              type={AddressType.SHIPPING}
              addresses={userStore.user.addresses.shippingAddresses}
            />
          ),
        },
        {
          icon: <FormOutlined />,
          title: 'Billing',
          children: (
            <Addresses
              title="Billing Addresses:"
              type={AddressType.BILLING}
              addresses={userStore.user.addresses.billingAddresses}
            />
          ),
        },
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
