import { Steps } from 'antd';
import { MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './ProfileForm.module.css';
import { PasswordData, PersonalData } from './sub-componetns';
import userStore from '../../store/user-store';
import { BootState } from '../../enums';

export const ProfileForm = observer(() => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const isAuthorized = userStore.isAuthorized || Boolean(userStore.user);

  if (userStore.bootState === BootState.InProgress) return null;
  if (userStore.bootState === BootState.Success && !isAuthorized) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Steps className={styles.steps} onChange={setStep} current={step}>
        <Steps.Step title="Pesonal" icon={<SolutionOutlined />} onClick={() => setStep(0)} />
        <Steps.Step title="Password" icon={<UnlockOutlined />} onClick={() => setStep(1)} />
        <Steps.Step title="Addresses" icon={<MailOutlined />} onClick={() => setStep(2)} />
      </Steps>
      {step === 0 && <PersonalData />}
      {step === 1 && <PasswordData />}
    </>
  );
});
