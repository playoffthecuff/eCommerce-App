import { Card, Rate, Skeleton } from 'antd';

import { BootState } from '../../enums';

import styles from './TestCard.module.css';

import image1 from '../../assets/images/670961-1_1800x1800.webp';

const { Meta } = Card;

type ProductCardProps = {
  abbrev?: string;
  name?: string;
  postalCodePattern?: string;
  loading?: BootState;
};

export default function TestCard({ abbrev, name, postalCodePattern, loading }: ProductCardProps) {
  return (
    <Card
      className={styles.productCard}
      hoverable
      cover={
        loading !== BootState.InProgress ? (
          <Skeleton.Image className={styles.productImage} active />
        ) : (
          <img alt={name} src={image1} className={styles.productImage} />
        )
      }
    >
      <Skeleton loading={loading !== BootState.InProgress} active>
        <Meta title={name} description={abbrev} />
        <div className={styles.productPrice}>${postalCodePattern}</div>
        <Rate allowHalf defaultValue={4} />
      </Skeleton>
    </Card>
  );
}
