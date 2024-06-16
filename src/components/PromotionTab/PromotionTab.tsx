import { AimOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './PromotionTab.module.css';

type Props = {
  className?: string;
};

export default function PromotionTab({ className }: Props) {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.text}>TODAY OFFER</div>
      <AimOutlined style={{ color: 'var(--color-error)' }} />
    </div>
  );
}
