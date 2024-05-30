import { observer } from 'mobx-react-lite';
import { Typography } from 'antd';
import ProductCard from '../ProductCard/ProductCard';

import styles from './BestBikes.module.css';
import CustomButton from '../CustomButton/CustomButton';
import { productsStore } from '../../store/catalog-store';

import shuffleArray from '../../utils/shuffle-array';

const { Title } = Typography;

export default observer(function BestBikes() {
  const { products, productsState } = productsStore;

  const shuffledProducts = shuffleArray([...products]);

  return (
    <section className={styles['best-bikes']}>
      <Title level={2} className={styles['best-bikes-title']}>
        Best Selling Bikes
      </Title>
      <ul className={styles['product-wrapper']}>
        {shuffledProducts.slice(0, 4).map((product) => {
          return (
            <li key={product._id}>
              <ProductCard {...product} loading={productsState} />
            </li>
          );
        })}
      </ul>

      <CustomButton variety="common" htmlType="button" style={{ alignSelf: 'center' }}>
        LOAD MORE
      </CustomButton>
    </section>
  );
});
