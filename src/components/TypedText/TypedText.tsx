import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './TypedText.module.css';

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

export default function TypedText({ text, className, delay = 50 }: Props) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        },
        text[currentIndex - 1] === '.' || text[currentIndex - 1] === '!' ? delay * 20 : delay
      );

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span className={classNames(className, styles.text)}>{currentText}</span>;
}
