import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './GrowingList.module.css';

type Props = {
  items: string[];
  className?: string;
  delay?: number;
  fadeTime?: number;
};

export default function GrowingList({ items, className, delay = 500, fadeTime = 0.8 }: Props) {
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentIndex < items.length) {
      const timeout = setTimeout(() => {
        setCurrentItems((prevItems) => [...prevItems, items[currentIndex]]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, items]);

  return (
    <>
      {currentItems.map((item, index) => (
        <li
          className={classNames(styles['list-item'], className)}
          style={{ animationDuration: `${fadeTime}s` }}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          {item}
        </li>
      ))}
    </>
  );
}
