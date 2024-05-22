import { Card, Typography } from 'antd';

import productImage from '../../assets/images/670961_1800x1800.webp';

const { Title, Text } = Typography;

type ProductCardProps = {
  abbrev: string;
  name: string;
  postalCodePattern: string;
};

function ProductCard({ abbrev, name, postalCodePattern }: ProductCardProps) {
  return (
    <Card hoverable style={{ width: 280 }} cover={<img alt="City Step-Through 3-Speed" src={productImage} />}>
      <Title level={4}>{name}</Title>
      <Text type="secondary">{abbrev}</Text>
      <Title level={5} style={{ marginTop: 10 }}>
        {postalCodePattern}
      </Title>
    </Card>
  );
}

export default ProductCard;
