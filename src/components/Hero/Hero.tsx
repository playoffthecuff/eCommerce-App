import Carousel from './components/Carousel/Carousel';

import styles from './Hero.module.css';

type HeroProps = {
  style: React.CSSProperties;
};

function Hero({ style }: HeroProps) {
  return (
    <section className={styles.hero} style={style}>
      <Carousel />
    </section>
  );
}

export default Hero;
