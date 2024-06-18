import Hero from '../../components/Hero/Hero';
import BestBikes from '../../components/BestBikes/BestBikes';
import Promo from '../../components/Promo/Promo';

function MainPage() {
  return (
    <>
      <Hero style={{ maxWidth: '100vw' }} />
      <div className="container">
        <Promo />
        <BestBikes />
      </div>
    </>
  );
}

export default MainPage;
