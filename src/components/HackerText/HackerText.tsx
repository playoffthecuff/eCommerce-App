import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './HackerText.module.css';

type Props = {
  text: string;
  className?: string;
  threshold?: number;
  iterations?: number;
};

export default function HackerText({ text, className, threshold = 0.5, iterations = 4 }: Props) {
  const spanRef = useRef<HTMLElement>(null);
  const letters = '!@#$%^&*()+-={}|[]:";<>?';
  const [hackerText, setHackerText] = useState(text);

  useEffect(() => {
    const span = spanRef.current as HTMLElement;

    const resetText = () => {
      setHackerText(text);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let iteration = 0;
            let requestId: number | null = null;
            const { length } = text; // Use length of the actual text

            const scrambleText = () => {
              setHackerText((prev: string) => {
                const scrambledText = prev
                  .split('')
                  .map((_, index) => {
                    if (index < iteration) {
                      return text[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                  })
                  .join('');
                iteration += 1 / iterations;
                if (iteration >= length) {
                  cancelAnimationFrame(requestId as number);
                  return text;
                }
                return scrambledText;
              });
              if (iteration < length) {
                requestId = requestAnimationFrame(scrambleText);
              }
            };
            requestId = requestAnimationFrame(scrambleText);
          } else {
            resetText();
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
  }, [text, threshold]);

  return (
    <span ref={spanRef} className={classNames(className, styles.text)}>
      {hackerText}
    </span>
  );
}
