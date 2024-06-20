/* eslint-disable react/no-array-index-key */
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Rate, Typography, InputNumber, Divider, Radio, Spin, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import TechSpecs from '../../components/TechSpecs/TechSpecs';
import Geometry from '../../components/Geometry/Geometry';
import NoProductResult from '../../components/NoProductResult/NoProductResult';
import BestBikes from '../../components/BestBikes/BestBikes';
import CustomButton from '../../components/CustomButton/CustomButton';
import { LogoIcon } from '../../components/CustomIcons/CustomIcons';

import productStore from '../../store/product-store';

import { WARRANTY_TEXT } from '../../utils/product-service';
import { BootState } from '../../types/boot-state';
import { cartStore } from '../../store/cart-store';
import { CartItem } from '../../types/types';
import styles from './Product.module.css';
import { formatMoney } from '../../utils/format-money';
import ProductSwiper from '../../components/ProductSwiper/ProductSwiper';
import { CubeSpin, CubeSpinner } from '../../components/CubeSpinner/CubeSpinner';

const { Paragraph, Text, Title } = Typography;

function ProductPage() {
  const location = useLocation();
  const [size, setSize] = useState<CartItem['size']>('M');
  const [quantity, setQuantity] = useState(1);
  const [query] = useSearchParams();
  const vendorCode = query.get('vc')!;
  const [notificationAPI, contextHolder] = notification.useNotification();
  useEffect(() => {
    cartStore.loadItems();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await productStore.loadProduct(vendorCode);
    }
    fetchData();
  }, [location.search]);

  const handleAddItem = async () => {
    const { _id: productId, title } = productStore.product!;
    try {
      await cartStore.addToCart({
        productId,
        size,
        quantity,
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

  const handleRemoveItem = async () => {
    setQuantity(1);
    const { _id: id, title } = productStore.product!;
    try {
      await cartStore.removeFromCart(id, size);
      notificationAPI.success({
        message: `You have removed "${title}" from the cart.`,
        placement: 'top',
        icon: <SmileOutlined />,
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

  if (productStore.bootState === BootState.InProgress) {
    return (
      <Spin
        indicator={<CubeSpinner size={32} tilted />}
        style={{ width: '100vw', position: 'absolute', top: '40dvh' }}
      />
    );
  }
  if (productStore.bootState !== BootState.Success || !productStore.product) {
    return <NoProductResult />;
  }
  const cartItem = cartStore.getCartItem(productStore.product._id, size);

  return (
    <>
      <CubeSpin spinning={cartStore.cartState === BootState.InProgress}>
        <div className={styles.container}>
          <div className={styles['product-container']}>
            <div className={styles['image-block']}>
              <ProductSwiper />
            </div>
            <div className={styles['info-block']}>
              <div className={styles['heading-block']}>
                <Title ellipsis={{ tooltip: productStore.product.title }} level={2} style={{ marginTop: 8 }}>
                  {productStore.product.title}
                </Title>
              </div>
              <div className={styles['rate-block']}>
                <Rate allowHalf disabled value={productStore.product.rating} />
                <Paragraph>
                  <Text>#</Text>
                  <Text copyable>{`${productStore.product.vendorCode}`}</Text>
                </Paragraph>
              </div>
              <div className={styles['price-block']}>
                <Text className={productStore.product.discountedPrice ? styles['old-price'] : ''}>
                  {formatMoney(productStore.product.price)}
                </Text>
                {!!productStore.product.discountedPrice && (
                  <Text className={styles['discounted-price']}>
                    {formatMoney(productStore.product.discountedPrice)}
                  </Text>
                )}
              </div>
              <Paragraph ellipsis={{ rows: 5, expandable: 'collapsible' }}>
                {productStore.product.shortDescription}
              </Paragraph>
              {productStore.product.category === 'bikes' && (
                <div className={styles['size-block']}>
                  <Paragraph>Size:</Paragraph>
                  <Radio.Group
                    onChange={(e) => {
                      setSize(e.target.value);
                      setQuantity(1);
                    }}
                    value={size}
                  >
                    <Radio.Button value="S">S</Radio.Button>
                    <Radio.Button value="M">M</Radio.Button>
                    <Radio.Button value="L">L</Radio.Button>
                  </Radio.Group>
                </div>
              )}
              <div className={styles['cart-block']}>
                <InputNumber
                  min={1}
                  value={cartItem ? cartItem.quantity : quantity}
                  onChange={(value) => {
                    if (cartItem || !value) return;
                    setQuantity(value);
                  }}
                  disabled={Boolean(cartItem)}
                />
                {!cartItem && (
                  <CustomButton variety="common" className={styles['cart-button']} onClick={handleAddItem}>
                    ADD TO CART
                  </CustomButton>
                )}
                {cartItem && (
                  <CustomButton variety="common" className={styles['cart-button']} onClick={handleRemoveItem}>
                    REMOVE
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
          <div>
            <Title level={2}>PRODUCT DETAILS</Title>
            <Divider style={{ marginTop: 0 }} />
            <div className={styles['product-details-container']}>
              <div>
                <Paragraph>{productStore.product.description}</Paragraph>
              </div>
              <div className={styles['overview-block']}>
                <div>
                  <Title level={5}>PRODUCT FEATURES</Title>
                  <Paragraph>
                    <ul>
                      {productStore.product.overview.map((item, index) => (
                        <li key={`${index}`}>{item}</li>
                      ))}
                    </ul>
                  </Paragraph>
                </div>
                <div>
                  <Title level={5}>3 YEARS WARRANTY</Title>
                  <div className={styles['warranty-block']}>
                    <div className={styles.logo}>
                      <LogoIcon />
                    </div>
                    <Paragraph>{WARRANTY_TEXT}</Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {productStore.product.category === 'bikes' && (
            <>
              <TechSpecs />
              <Geometry />
            </>
          )}
          <div>
            <Title level={2}>YOU MIGHT LIKE</Title>
            <Divider style={{ marginTop: 0 }} />
            <div className={classNames(styles['product-details-container'])}>
              <BestBikes />
            </div>
          </div>
        </div>
      </CubeSpin>
      {contextHolder}
    </>
  );
}

const observableProductPage = observer(ProductPage);
export default observableProductPage;
