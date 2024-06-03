/* eslint-disable react/no-array-index-key */
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Rate, Typography, InputNumber, Divider, Radio, Spin, Image } from 'antd';
import TechSpecs from '../../components/TechSpecs/TechSpecs';
import Geometry from '../../components/Geometry/Geometry';
import NoProductResult from '../../components/NoProductResult/NoProductResult';
// import ProductSwiper from '../../components/ProductSwiper/ProductSwiper';
import BestBikes from '../../components/BestBikes/BestBikes';
import CustomButton from '../../components/CustomButton/CustomButton';
import { LogoIcon } from '../../components/CustomIcons/CustomIcons';

import productStore from '../../store/product-store';

import { WARRANTY_TEXT } from '../../utils/product-service';
import { BootState } from '../../types/boot-state';
import styles from './Product.module.css';

const { Paragraph, Text, Title } = Typography;

function ProductPage() {
  const location = useLocation();
  useEffect(() => {
    const vendorCode = location.search.split('=')[1];
    async function fetchData() {
      await productStore.loadProduct(vendorCode);
    }
    fetchData();
  }, [location.search]);

  switch (productStore.bootState) {
    case BootState.Failed:
      return <NoProductResult />;
    case BootState.Success:
      return (
        <div className={styles.container}>
          <div className={styles['product-container']}>
            <div className={styles['image-block']}>
              {/* <ProductSwiper /> */} {/* back to swiper next sprint */}
              <Image.PreviewGroup items={productStore.product?.gallery?.map((img) => `data:image/png;base64,${img}`)}>
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
              <Paragraph ellipsis={{ rows: 5, expandable: 'collapsible' }}>
                {productStore.product?.description}
              </Paragraph>
              <div className={styles['size-block']}>
                <Paragraph>Size:</Paragraph>
                <Radio.Group>
                  <Radio.Button value="S">S</Radio.Button>
                  <Radio.Button value="M">M</Radio.Button>
                  <Radio.Button value="L">L</Radio.Button>
                </Radio.Group>
              </div>
              <div className={styles['cart-block']}>
                <InputNumber defaultValue={1} min={1} />
                <CustomButton variety="common">ADD TO CART</CustomButton>
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
      );
    case BootState.InProgress:
      return <Spin style={{ width: '100vw', position: 'absolute', top: '40dvh' }} />;
    default:
      return <NoProductResult />;
  }
}

const observableProductPage = observer(ProductPage);
export default observableProductPage;