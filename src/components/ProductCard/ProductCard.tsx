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
    <>
      <Link
        to={`/product?vc=${vendorCode}`}
        className={styles['product-card-link']}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
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
              {category === 'bikes' && (
                <>
                  <span>Size:</span>
                  <Radio.Group className={styles['size-radio-wrapper']} onChange={onChange} value={sizeValue}>
                    <Radio.Button value="S">S</Radio.Button>
                    <Radio.Button value="M">M</Radio.Button>
                    <Radio.Button value="L">L</Radio.Button>
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
              <div>
                {itemInCart && (
                  <Tooltip title="Remove from Cart">
                    <FullBagIcon className={styles['shopping-icon']} onClick={handleRemoveFromCart} />
                  </Tooltip>
                )}
                {!itemInCart && (
                  <Tooltip title="Add to Cart">
                    <ShoppingOutlined className={styles['shopping-icon']} onClick={handleAddToCart} />
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
      </Link>
      {contextHolder}
    </>
  );
});
