import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import styles from './LadderHeading.module.css';

type Props = {
  text: string;
  className?: string;
  animationSpeed?: number;
  startDelay?: number;
};

export default function LadderHeading({ text, className, animationSpeed = 1, startDelay = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const letters = container?.querySelectorAll(`.${styles.letter}`);

    const resetAnimation = () => {
      letters?.forEach((letter) => {
        (letter as HTMLElement).style.animation = 'none';
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (letter as HTMLElement).offsetHeight;
        (letter as HTMLElement).style.animation = '';
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetAnimation();
            letters?.forEach((letter, index) => {
              (letter as HTMLElement).style.animationDuration = `${animationSpeed}s`;
              (letter as HTMLElement).style.animationDelay = `${startDelay + (index * animationSpeed) / text.length}s`;
              (letter as HTMLElement).style.animationName = styles.slide;
            });
          } else {
            letters?.forEach((letter) => {
              (letter as HTMLElement).style.transform = `translateY(100%)`;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [animationSpeed, startDelay, text]);

  return (
    <div ref={containerRef} className={classNames(className, styles.wrapper)}>
      {text.split('').map((letter, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span className={styles.letter} key={index}>
          {letter}
        </span>
      ))}
    </div>
  );
}
