import { FormOutlined, MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styles from './ProfileForm.module.css';
import userStore from '../../store/user-store';
import { BootState } from '../../types/boot-state';
import { PasswordData, PersonalData } from './sub-componetns';
import { Addresses } from './sub-componetns/Address';
import { AddressType } from '../../types/authorization-response';

export const ProfileForm = observer(() => {
  const [currentTab, setCurrentTab] = useState(0);

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
    <>
      <div className={styles.tabs}>
        <div className={(currentTab === 0 && styles.active) || ''} onClick={() => setCurrentTab(0)}>
          <SolutionOutlined /> Personal
        </div>
        <div className={(currentTab === 1 && styles.active) || ''} onClick={() => setCurrentTab(1)}>
          <UnlockOutlined /> Password
        </div>
        <div className={(currentTab === 2 && styles.active) || ''} onClick={() => setCurrentTab(2)}>
          <MailOutlined /> Shipping
        </div>
        <div className={(currentTab === 3 && styles.active) || ''} onClick={() => setCurrentTab(3)}>
          <FormOutlined /> Billing
        </div>
      </div>
      {currentTab === 0 && <PersonalData />}
      {currentTab === 1 && <PasswordData />}
      {currentTab === 2 && (
        <Addresses
          title="Shipping Addresses:"
          type={AddressType.SHIPPING}
          addresses={userStore.user.addresses.shippingAddresses}
        />
      )}
      {currentTab === 3 && (
        <Addresses
          title="Billing Addresses:"
          type={AddressType.BILLING}
          addresses={userStore.user.addresses.billingAddresses}
        />
      )}
    </>
  );
});
