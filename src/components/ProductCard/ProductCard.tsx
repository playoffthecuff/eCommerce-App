import { Card, Typography } from 'antd';

import productImage from '../../assets/images/670961_1800x1800.webp';

const { Title, Text } = Typography;

function ProductCard() {
  return (
    <Card hoverable style={{ width: 280 }} cover={<img alt="City Step-Through 3-Speed" src={productImage} />}>
      <Title level={4}>CITY STEP-THROUGH 3-SPEED</Title>
      <Text type="secondary">PURE CYCLES</Text>
      <Title level={5} style={{ marginTop: 10 }}>
        US$1,049.00
      </Title>
    </Card>
  );
}

export default ProductCard;
