import BestBikes from '../../components/BestBikes/BestBikes';
import Hero from '../../components/Hero/Hero';
import LoginForm from '../../components/LoginForm/LoginForm';
import { RegistrationForm } from '../../components/RegistrationForm';

export default function DevPage() {
  return (
    <>
      <Hero style={{ maxWidth: '100vw' }} />
      <div className="container">
        <BestBikes />
      </div>
      <LoginForm />
      <RegistrationForm />
    </>
  );
}
