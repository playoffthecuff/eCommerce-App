import {
  Button,
  Rate,
  Image,
  Typography,
  InputNumber,
  Divider,
  DescriptionsProps,
  Descriptions,
  TableProps,
  Table,
} from 'antd';
import Title from 'antd/es/typography/Title';
import classNames from 'classnames';
import styles from './Product.module.css';
import image1 from '../../assets/images/716060_F1_00_1920x1920.png';
import image2 from '../../assets/images/716060_D_00.jpg';
import image3 from '../../assets/images/716060_D_01.jpg';
import image4 from '../../assets/images/716060_D_02.jpg';
import image5 from '../../assets/images/716060_D_03.jpg';
import image6 from '../../assets/images/716060_D_04.jpg';
import { LogoIcon } from '../../components/CustomIcons/CustomIcons';
import CustomButton from '../../components/CustomButton/CustomButton';
import drawing from '../../assets/images/geometry.svg';
import BestBikes from '../../components/BestBikes/BestBikes';

const { Paragraph, Text } = Typography;

interface DataType {
  key: string;
  name: string;
  small: number;
  medium: number;
  large: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Small (50 cm) for riders 5\'4" to 5\'8"',
    dataIndex: 'small',
    key: 'small',
  },
  {
    title: 'Medium (53 cm) for riders 5\'7" to 5\'11"',
    dataIndex: 'medium',
    key: 'medium',
  },
  {
    title: 'Large (56 cm) for riders 5\'10" to 6\'2"',
    dataIndex: 'large',
    key: 'large',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Seat Tube',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '2',
    name: 'Top Tube Horizontal',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '3',
    name: 'Seat Angle',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '4',
    name: 'Head Tube Angle',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '5',
    name: 'Chainstays',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '6',
    name: 'Head Tube',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '7',
    name: 'Wheel Base',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '8',
    name: 'BB-Height to Hub',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '9',
    name: 'Reach',
    small: 32,
    medium: 40,
    large: 50,
  },
  {
    key: '10',
    name: 'Stack',
    small: 32,
    medium: 40,
    large: 50,
  },
];

const frameSetItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Frame',
    children: 'High-Tensile Steel, TIG-Welded',
  },
  {
    key: '2',
    label: 'Fork',
    children: '1" High-Tensile Steel, Straight Tapered Legs',
  },
];

const driveTrainItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Crank Set',
    children: '3-Piece Alloy, 170mm',
  },
  {
    key: '2',
    label: 'Chainwheel',
    children: 'Steel, 42T x 1/2" x 1/8"',
  },
  {
    key: '3',
    label: 'Bottom Bracket',
    children: 'Sealed Cartridge, 68 x 110.5mm',
  },
  {
    key: '4',
    label: 'Sprocket',
    children: '16T x 1/2" x 1/8"',
  },
  {
    key: '5',
    label: 'Freewheel',
    children: 'N/A',
  },
  {
    key: '6',
    label: 'Rear Shifter',
    children: 'N/A',
  },
  {
    key: '7',
    label: 'Chain',
    children: 'K.M.C. S1, 1/2" x 1/8" (98 Links)',
  },
  {
    key: '8',
    label: 'Pedals',
    children: '9/16", Slip-Resistant Top',
  },
];

const brakesItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Front Brake',
    children: 'N/A',
  },
  {
    key: '2',
    label: 'Rear Brake',
    children: 'KT Coaster Brake',
  },
  {
    key: '3',
    label: 'Brake Lever',
    children: 'N/A',
  },
];

const componentsItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Handlebar',
    children: '3-Piece Alloy, 170mm',
  },
  {
    key: '2',
    label: 'Stem',
    children: 'Steel, 610mm Wide x 26mm Rise x 33Deg Back Sweep',
  },
  {
    key: '3',
    label: 'Headset',
    children: 'Steel, Caged Bearings, 22.2 x 30 x 27mm',
  },
  {
    key: '4',
    label: 'Grips',
    children: 'Kraton Rubber, 127mm',
  },
  {
    key: '5',
    label: 'Saddle',
    children: 'Pure Cycles Urban, Steel Rails',
  },
  {
    key: '6',
    label: 'Seat Post',
    children: 'Alloy W/Integrated Clamp, 25.4 x 300mm',
  },
  {
    key: '7',
    label: 'Seat Clamp',
    children: 'Alloy, 28.6mm I.D., with Bolt',
  },
];

const wheelsItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Front Wheel',
    children: '700C x 32H x 14G Alloy-Urban, Bolt-On',
  },
  {
    key: '2',
    label: 'Rear Wheel',
    children: '700C x 32H x 14G Alloy-Urban, W/KT Coaster Brake',
  },
  {
    key: '3',
    label: 'Front Hub',
    children: 'Steel, 32H x 14G with 3/8" Bolt-On Axle',
  },
  {
    key: '4',
    label: 'Rear Hub',
    children: 'KT Coaster Brake, 32H x 14G',
  },
  {
    key: '5',
    label: 'Spokes',
    children: '14G Stainless Steel',
  },
  {
    key: '6',
    label: 'Rims',
    children: '700c x 32H x 14G, Alloy, Double Wall',
  },
  {
    key: '7',
    label: 'Tires',
    children: 'WTB Wedge 700 x 32C, Black Wall',
  },
  {
    key: '8',
    label: 'Tubes',
    children: '700c x 28-35mm, Presta Valve (48mm)',
  },
];

const weightItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Weight Limit',
    children: '250 Lbs.',
  },
];

const notesItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Pricing & Specifications',
    children:
      "We reserve the right to modify this product's specifications, colors, and materials without prior notice. Additionally, retail prices may vary from the Manufacturer's Suggested Retail Price (MSRP), which does not include shipping, assembly, or taxes.",
  },
];

function ProductPage() {
  return (
    <div className="container">
      <div className={styles['product-container']}>
        <div className={styles['header-block']}>
          <Title level={2}>City Step-Through 26&quot;</Title>
          <div className={styles['rate-block']}>
            <Rate allowHalf value={3.5} />
            <Paragraph copyable>#675619</Paragraph>
          </div>
          <div className={styles['price-block']}>
            <Text className={styles['old-price']}>$112.46</Text>
            <Text className={styles['discounted-price']}>$99.99</Text>
          </div>
          <Paragraph>
            Our superlight, go-anywhere helmet got even lighter. The updated Vapor helmet features two-piece
            construction for added protection and reduced weight, while an ultralight cord fit system makes fit
            adjustments easy to fine-tune.
          </Paragraph>
        </div>
        <div className={styles['image-block']}>
          <Image.PreviewGroup items={[image1, image2, image3, image4, image5, image6]}>
            <Image src={image1} />
          </Image.PreviewGroup>
        </div>
        <div className={styles['description-block']}>
          <div className={styles['size-block']}>
            <Paragraph>Size:</Paragraph>
            <Button>S</Button>
            <Button>M</Button>
            <Button>L</Button>
          </div>
          <div className={styles['cart-block']}>
            <InputNumber defaultValue={1} onChange={() => {}} />
            <CustomButton variety="inverted">ADD TO CART</CustomButton>
          </div>
        </div>
      </div>
      <div className={styles['product-details-block']}>
        <Title level={2}>PRODUCT DETAILS</Title>
        <Divider style={{ marginTop: 0 }} />
        <div className={styles['product-details-container']}>
          <div className={styles['description-block']}>
            <Paragraph>
              Our superlight, go-anywhere helmet got even lighter. The updated Vapor helmet features two-piece
              construction for added protection and reduced weight, while an ultralight cord fit system makes fit
              adjustments easy to fine-tune.
            </Paragraph>
          </div>
          <div className={styles['overview-block']}>
            <div>
              <Title level={5}>PRODUCT FEATURES</Title>
              <Paragraph>
                <ul>
                  <li>Ultralight design at 155g </li>
                  <li>Multi-material construction to minimize weight and bulk while maximizing durability </li>
                  <li>Lightweight and packable cord fit system stows and adjusts easily </li>
                  <li>Geometric, open-air design allows unparalleled airflow and iconic silhouette </li>
                  <li>UIAA and CE Certified </li>
                </ul>
              </Paragraph>
            </div>
            <div>
              <Title level={5}>3 YEARS WARRANTY</Title>
              <div className={styles['warranty-block']}>
                <div className={styles.logo}>
                  <LogoIcon />
                </div>
                <Paragraph>
                  We believe in our bikes and we believe you should be able to enjoy riding without sweating the small
                  stuff - that’s why we’ve got your back! With a lifetime warranty on frames and a 3-year warranty on
                  components, you can ride confidently with the knowledge that we’ve got you covered. We trust what we
                  make because we use what we make. All Cycling Dependency products are covered by a three year warranty
                  policy.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['product-details-block']}>
        <Title level={2}>TECH SPECS</Title>
        <Divider style={{ marginTop: 0 }} />
        <div className={styles['product-details-container']}>
          <div className={styles['description-table']}>
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  FRAMESET
                </Title>
              }
              bordered
              column={1}
              items={frameSetItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  DRIVETRAIN
                </Title>
              }
              bordered
              column={1}
              items={driveTrainItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  BRAKES
                </Title>
              }
              bordered
              column={1}
              items={brakesItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  COMPONENTS
                </Title>
              }
              bordered
              column={1}
              items={componentsItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  WHEELS
                </Title>
              }
              bordered
              column={1}
              items={wheelsItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  WEIGHT
                </Title>
              }
              bordered
              column={1}
              items={weightItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
            <Descriptions
              size="small"
              title={
                <Title level={3} className={styles['background-secondary']}>
                  NOTES
                </Title>
              }
              bordered
              column={1}
              items={notesItems}
              labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
            />
          </div>
        </div>
      </div>
      <div className={styles['product-details-block']}>
        <Title level={2}>SIZING & GEOMETRY</Title>
        <Divider style={{ marginTop: 0 }} />
        <div className={classNames(styles['product-details-container'])}>
          <img alt="drawing" src={drawing} style={{ marginTop: '1rem', width: '100%' }} />
          <Table
            className={(styles['geometry-table'], styles['flex-gap-container'])}
            columns={columns}
            dataSource={data}
            size="small"
            pagination={false}
          />
        </div>
      </div>
      <div className={styles['product-details-block']}>
        <Title level={2}>YOU MIGHT LIKE</Title>
        <Divider style={{ marginTop: 0 }} />
        <div className={classNames(styles['product-details-container'])}>
          <BestBikes />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
