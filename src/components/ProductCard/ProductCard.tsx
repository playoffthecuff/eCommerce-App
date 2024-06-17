import { Card, Radio, RadioChangeEvent, Rate, Skeleton, Tooltip } from 'antd';
import classNames from 'classnames';
import { ShoppingFilled, ShoppingTwoTone } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, ProductSummary } from '../../types/types';
import { BootState } from '../../enums';
import { cartStore } from '../../store/cart-store';
import placeholder from '../../assets/images/load_failed.webp';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: ProductSummary;
  loading: BootState;
};

export default observer(function ProductCard({ product, loading }: ProductCardProps) {
  const { title, price, discountedPrice, vendorCode, rating, thumbs, _id: id } = product;
  const navigate = useNavigate();
  const [sizeValue, setSizeValue] = useState<CartItem['size']>('M');

  const onChange = (event: RadioChangeEvent) => {
    setSizeValue(event.target.value);
  };

  const handleAddToCart = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    await cartStore.addToCart({
      productId: id,
      size: sizeValue,
      quantity: 1,
    });
  };

  const itemInCart = Boolean(cartStore.getCartItem(id, sizeValue));

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
          <Card.Meta title={title} className={styles['product-title']} />
          <div className={styles['size-block']}>
            <span>Size:</span>
            <Radio.Group className={styles['size-radio-wrapper']} onChange={onChange} value={sizeValue}>
              <Radio.Button value="S">S</Radio.Button>
              <Radio.Button value="M">M</Radio.Button>
              <Radio.Button value="L">L</Radio.Button>
            </Radio.Group>
          </div>
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
              {itemInCart && (
                <Tooltip title="Go to Cart">
                  <ShoppingFilled
                    style={{ fontSize: '24px', color: 'green' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      navigate('/cart');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </Tooltip>
              )}
              {!itemInCart && (
                <Tooltip title="Add to Cart">
                  <ShoppingTwoTone style={{ fontSize: '24px' }} onClick={handleAddToCart} />
                </Tooltip>
              )}
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
          <div className={styles['product-card-notification-container']} />
        </Skeleton>
      </Card>
    </a>
  );
});
