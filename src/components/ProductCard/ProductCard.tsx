import { Card, Radio, RadioChangeEvent, Rate, Skeleton, Tooltip, notification } from 'antd';
import classNames from 'classnames';
import { FrownOutlined, MehOutlined, ShoppingOutlined, SmileOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem, ProductSummary } from '../../types/types';
import { BootState } from '../../types/boot-state';
import { cartStore } from '../../store/cart-store';
import placeholder from '../../assets/images/load_failed.webp';
import styles from './ProductCard.module.css';
import { formatMoney } from '../../utils/format-money';
import { FullBagIcon } from '../CustomIcons/CustomIcons';

type ProductCardProps = {
  product: ProductSummary;
  loading: BootState;
};

export default observer(function ProductCard({ product, loading }: ProductCardProps) {
  const { title, price, discountedPrice, vendorCode, rating, thumbs, _id: id, category } = product;
  const [sizeValue, setSizeValue] = useState<CartItem['size']>('M');
  const [notificationAPI, contextHolder] = notification.useNotification();

  const onChange = (event: RadioChangeEvent) => {
    setSizeValue(event.target.value);
  };

  const handleAddToCart = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      await cartStore.addToCart({
        productId: id,
        size: sizeValue,
        quantity: 1,
      });
      notificationAPI.success({
        message: `You have added "${title}" to the cart.`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (err) {
      notificationAPI.error({
        message: `Failed to add "${title}" to the cart.`,
        description: 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
  };

  const handleRemoveFromCart = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      await cartStore.removeFromCart(id, sizeValue);
      notificationAPI.success({
        message: `You have removed "${title}" from the cart.`,
        placement: 'top',
        icon: <MehOutlined />,
        duration: 2.5,
      });
    } catch (err) {
      notificationAPI.error({
        message: `Failed to remove "${title}" from the cart.`,
        description: 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
  };

  const itemInCart = Boolean(cartStore.getCartItem(id, sizeValue));

  return (
    <div className={styles['product-card-link']}>
      <Card
        className={styles['product-card']}
        hoverable
        cover={
          loading === BootState.InProgress ? (
            <Link
              to={`/product?vc=${vendorCode}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Skeleton.Image className={styles.skeletonImage} active />
              <Card.Meta title={title} className={styles['product-title']} style={{ marginTop: '1rem' }} />
            </Link>
          ) : (
            <Link
              to={`/product?vc=${vendorCode}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                alt={title}
                src={thumbs ? `data:image/jpeg;base64,${thumbs}` : placeholder}
                className={styles.productImage}
              />
              <Card.Meta title={title} className={styles['product-title']} style={{ marginTop: '1rem' }} />
            </Link>
          )
        }
      >
        <Skeleton loading={loading === BootState.InProgress} active paragraph={{ rows: 2 }}>
          <div className={styles['size-block']}>
            {category === 'bikes' && (
              <>
                <span>Size:</span>
                <Radio.Group className={styles['size-radio-wrapper']} onChange={onChange} value={sizeValue}>
                  <Radio.Button value="S" className={styles['size-button']}>
                    S
                  </Radio.Button>
                  <Radio.Button value="M" className={styles['size-button']}>
                    M
                  </Radio.Button>
                  <Radio.Button value="L" className={styles['size-button']}>
                    L
                  </Radio.Button>
                </Radio.Group>
              </>
            )}
          </div>

          <div className={styles['card-body-wrapper']}>
            <div className={styles.productPrice}>
              {discountedPrice ? (
                <>
                  <span className={classNames(styles.originalPrice, styles.lineThrough)}>{formatMoney(price)}</span>
                  <span className={styles.discountedPrice}>{formatMoney(discountedPrice)}</span>
                </>
              ) : (
                <span>{formatMoney(price)}</span>
              )}
            </div>
            {itemInCart && (
              <Tooltip title="Remove from Cart">
                <div style={{ padding: '0.5rem' }}>
                  <FullBagIcon className={styles['shopping-icon']} onClick={handleRemoveFromCart} />
                </div>
              </Tooltip>
            )}
            {!itemInCart && (
              <Tooltip title="Add to Cart">
                <div style={{ padding: '0.5rem' }}>
                  <ShoppingOutlined className={styles['shopping-icon']} onClick={handleAddToCart} />
                </div>
              </Tooltip>
            )}
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
      {contextHolder}
    </div>
  );
});
