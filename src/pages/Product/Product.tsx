import { Button, Rate } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import styles from './Product.module.css';

function ProductPage() {
  return (
    <div className="wrapper">
      <Title level={2}>VAPOR HELMET</Title>
      <Rate value={4} />
      <Paragraph>#675619</Paragraph>
      <Paragraph>$112.46</Paragraph>
      <Paragraph className={styles['discounted-price']}>$99.99</Paragraph>
      <Button>S</Button>
      <Button>M</Button>
      <Button>L</Button>
    </div>
  );
}

export default ProductPage;
