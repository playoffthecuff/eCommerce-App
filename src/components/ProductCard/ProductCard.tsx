import { Card, Typography, Image } from 'antd';

import styles from './ProductCard.module.css';

// import productImage from '../../assets/images/670961_1800x1800.webp';
import image1 from '../../assets/images/670961-1_1800x1800.webp';
import image2 from '../../assets/images/670961_1800x1800.webp';
import image3 from '../../assets/images/670963_1800x1800.webp';
import image4 from '../../assets/images/670965_1800x1800.webp';
import productImage from '../../assets/images/transparant.png';

const { Title, Text } = Typography;

type ProductCardProps = {
  abbrev?: string;
  name?: string;
  postalCodePattern?: string;
};

function ProductCard({ abbrev, name, postalCodePattern }: ProductCardProps) {
  return (
    <Card
      hoverable
      style={{ width: 280 }}
      // cover={<img alt="City Step-Through 3-Speed" src={productImage} />}
      cover={
        <Image.PreviewGroup items={[image1, image2, image3, image4, productImage]}>
          <Image width={280} src={image1} />
        </Image.PreviewGroup>
      }
      className={styles['product-card']}
    >
      <Title level={4}>{name}</Title>
      <Text type="secondary">{abbrev}</Text>
      <Title level={5} style={{ marginTop: 10 }}>
        {postalCodePattern}
      </Title>
    </Card>
  );
}

export default ProductCard;
