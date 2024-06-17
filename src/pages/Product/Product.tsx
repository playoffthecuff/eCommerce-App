/* eslint-disable react/no-array-index-key */
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Rate, Typography, InputNumber, Divider, Radio, Spin, Image, Space, notification } from 'antd';
import { ZoomOutOutlined, ZoomInOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
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
    try {
      await cartStore.addToCart({
        productId: productStore.product!._id,
        size,
        quantity,
      });
      notificationAPI.success({
        message: `You have added the item to the cart.`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (err) {
      notificationAPI.error({
        message: `Failed to add the item.`,
        description: 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
  };

  const handleRemoveItem = async () => {
    setQuantity(1);
    try {
      await cartStore.removeFromCart(productStore.product!._id, size);
      notificationAPI.success({
        message: `You have delete the item.`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (err) {
      notificationAPI.error({
        message: `Failed to delete the item.`,
        description: 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
  };

  if (productStore.bootState === BootState.InProgress) {
    return <Spin style={{ width: '100vw', position: 'absolute', top: '40dvh' }} />;
  }
  if (productStore.bootState !== BootState.Success) {
    return <NoProductResult />;
  }
  const cartItem = cartStore.getCartItem(productStore.product!._id, size);

  return (
    <>
      <div className={styles.container}>
        <div className={styles['product-container']}>
          <div className={styles['image-block']}>
            <Image.PreviewGroup
              items={productStore.product?.gallery?.map((img) => `data:image/png;base64,${img}`)}
              preview={{
                toolbarRender: (_, { transform: { scale }, actions: { onZoomOut, onZoomIn } }) => (
                  <Space size={24} className="toolbar-wrapper">
                    <ZoomOutOutlined style={{ fontSize: '1.25rem' }} disabled={scale === 1} onClick={onZoomOut} />
                    <ZoomInOutlined style={{ fontSize: '1.25rem' }} disabled={scale === 50} onClick={onZoomIn} />
                  </Space>
                ),
              }}
            >
              <Image src={`data:image/png;base64,${productStore.product?.gallery![0]}`} />
            </Image.PreviewGroup>
          </div>
          <div className={styles['info-block']}>
            <div className={styles['header-block']}>
              <Title level={2}>{productStore.product?.title}</Title>
            </div>
            <div className={styles['rate-block']}>
              <Rate allowHalf disabled value={productStore.product?.rating} />
              <Paragraph copyable>{`#${productStore.product?.vendorCode}`}</Paragraph>
            </div>
            <div className={styles['price-block']}>
              <Text
                className={productStore.product?.discountedPrice ? styles['old-price'] : ''}
              >{`$${productStore.product?.price}`}</Text>
              {!!productStore.product?.discountedPrice && (
                <Text className={styles['discounted-price']}>{`$${productStore.product.discountedPrice}`}</Text>
              )}
            </div>
            <Paragraph ellipsis={{ rows: 5, expandable: 'collapsible' }}>{productStore.product?.description}</Paragraph>
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
                <CustomButton variety="common" onClick={handleAddItem}>
                  ADD TO CART
                </CustomButton>
              )}
              {cartItem && (
                <CustomButton style={{ width: '126px' }} variety="common" onClick={handleRemoveItem}>
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
              <Paragraph>{productStore.product?.description}</Paragraph>
            </div>
            <div className={styles['overview-block']}>
              <div>
                <Title level={5}>PRODUCT FEATURES</Title>
                <Paragraph>
                  <ul>{productStore.product?.overview.map((item, index) => <li key={`${index}`}>{item}</li>)}</ul>
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
        {productStore.product?.category === 'bikes' && (
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
      {contextHolder}
    </>
  );
}

const observableProductPage = observer(ProductPage);
export default observableProductPage;
