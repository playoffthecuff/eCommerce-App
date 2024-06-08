import { Card, Rate, Skeleton } from 'antd';
import classNames from 'classnames';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react-lite';
import { ProductSummary } from '../../types/types';
import { BootState } from '../../enums';
import userStore from '../../store/user-store';
import { cartStore } from '../../store/cart-store';

import styles from './ProductCard.module.css';

import placeholder from '../../assets/images/load_failed.webp';

const { Meta } = Card;

type ProductCardProps = {
  product: ProductSummary;
  loading: BootState;
};

export default observer(function ProductCard({ product, loading }: ProductCardProps) {
  const { title, price, discountedPrice, vendorCode, rating, thumbs, _id: id } = product;

  const handleAddToCart = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();

    const payload = {
      ...cartStore.payload,
      userId: userStore.user?.id,
      productId: id,
    };

    cartStore.addToCart(payload);

    console.log(`Adding product ${id} to cart`);
  };

  return (
    <a href={`${import.meta.env.BASE_URL}#/product?vc=${vendorCode}`} className={styles['product-card-link']}>
      <Card
        className={styles.productCard}
        hoverable
        cover={
          loading === BootState.InProgress ? (
            <Skeleton.Image className={styles.skeletonImage} active />
          ) : (
            <img
              alt={title}
              src={thumbs ? `data:image/jpeg;base64,${thumbs}` : placeholder}
              className={styles.productImage}
            />
          )
        }
      >
        <Skeleton loading={loading === BootState.InProgress} active paragraph={{ rows: 2 }}>
          <Meta title={title} className={styles['product-title']} />
          <div className={styles['card-body-wrapper']}>
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
            <div>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} onClick={handleAddToCart} />
            </div>
          </div>
          <div className={styles['rate-wrapper']}>
            <Rate
              allowHalf
              value={rating}
              disabled
              className={styles.rate}
              style={{ color: 'var(--color-text)', fontSize: 10 }}
            />
            <div className={styles['rate-line']} />
          </div>
        </Skeleton>
      </Card>
    </a>
  );
});
