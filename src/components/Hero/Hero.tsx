import Carousel from './components/Carousel/Carousel';

type HeroProps = {
  style: React.CSSProperties;
};

function Hero({ style }: HeroProps) {
  return (
    <section style={style}>
      <Carousel />
    </section>
  );
}

export default Hero;
