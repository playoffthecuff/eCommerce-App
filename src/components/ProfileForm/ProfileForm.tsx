import { Steps } from 'antd';
import { MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './ProfileForm.module.css';
import { PasswordData, PersonalData } from './sub-componetns';

export default function ProfilePage() {
  const [step, setStep] = useState(0);
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
}
