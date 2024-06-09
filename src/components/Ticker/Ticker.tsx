import classNames from 'classnames';
import styles from './Ticker.module.css';

type Props = {
  repeat?: number;
  content: React.ReactNode;
  className?: string;
  stoppable?: boolean;
  reverse?: boolean;
  duration?: string;
};

export default function Ticker({
  repeat = 1,
  content,
  className,
  stoppable = false,
  reverse = false,
  duration = '10s',
}: Props) {
  return (
    <div className={classNames(styles.ticker, styles.neo, className, { [styles.stoppable]: stoppable })}>
      <ul className={classNames(styles.content, { [styles.reverse]: reverse })} style={{ animationDuration: duration }}>
        {new Array(repeat).fill(0).map(() => (
          <li>{content}</li>
        ))}
      </ul>
      <ul
        aria-hidden
        className={classNames(styles.content, { [styles.reverse]: reverse })}
        style={{ animationDuration: duration }}
      >
        {new Array(repeat).fill(0).map(() => (
          <li>{content}</li>
        ))}
      </ul>
    </div>
  );
}
