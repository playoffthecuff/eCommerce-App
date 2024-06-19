import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import styles from './FadedText.module.css';

type Props = {
  text: string;
  className?: string;
  animationSpeed?: number;
  startDelay?: number;
  threshold?: number;
};

export default function FadedText({ text, className, animationSpeed = 1, startDelay = 0, threshold = 0.5 }: Props) {
  const spanRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const span = spanRef.current as HTMLElement;
    // const span = container?.querySelector(`.${styles.text}`) as HTMLElement;
    const resetAnimation = () => {
      span.style.animation = 'none';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      span.offsetHeight;
      span.style.animation = '';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetAnimation();
            span.style.animationDuration = `${animationSpeed}s`;
            span.style.animationDelay = `${startDelay + animationSpeed / text.length}s`;
            span.style.animationName = styles.fade;
          } else {
            span.style.opacity = `0`;
          }
        });
      },
      { threshold }
    );

    if (span) {
      observer.observe(span);
    }

    return () => {
      if (span) {
        observer.unobserve(span);
      }
    };
  }, [animationSpeed, startDelay, text]);

  return (
    <span ref={spanRef} className={classNames(className, styles.text)}>
      {text}
    </span>
  );
}
