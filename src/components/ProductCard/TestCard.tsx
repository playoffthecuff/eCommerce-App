import { Card, Rate, Skeleton } from 'antd';
import classNames from 'classnames';

import { Product } from '../../types/types';
import { BootState } from '../../enums';

import styles from './TestCard.module.css';

import image1 from '../../assets/images/670961-1_1800x1800.webp';

const { Meta } = Card;

type ProductCardProps = {
  loading: BootState;
} & Product;

export default function TestCard({
  price,
  rating,
  title,
  loading,
  'discounted price': discountedPrice,
}: ProductCardProps) {
  return (
    <Card
      className={styles.productCard}
      hoverable
      cover={
        loading === BootState.InProgress ? (
          <Skeleton.Image className={styles.productImage} active />
        ) : (
          <img alt={title} src={image1} className={styles.productImage} />
        )
      }
    >
      <Skeleton loading={loading === BootState.InProgress} active>
        <Meta title={title} />
        <div className={styles.productPrice}>
          {discountedPrice ? (
            <>
              <span className={classNames(styles.originalPrice, styles.lineThrough)}>${price}</span>
              <span className={styles.discountedPrice}>${discountedPrice}</span>
            </>
          ) : (
            <span>${price}</span>
          )}
        </div>
        <div className={styles['rate-wrapper']}>
          <Rate
            allowHalf
            defaultValue={rating}
            disabled
            className={styles.rate}
            style={{ color: 'black', fontSize: 10 }}
          />
          <div className={styles['rate-line']} />
        </div>
      </Skeleton>
    </Card>
  );
}
