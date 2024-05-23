import Hero from '../../components/Hero/Hero';
import BestBikes from '../../components/BestBikes/BestBikes';

function Main() {
  return (
    <>
      <Hero style={{ maxWidth: '100vw' }} />
      <div className="container">
        <BestBikes />
      </div>
    </>
  );
}

export default Main;
