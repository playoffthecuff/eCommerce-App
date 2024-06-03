import { Divider, Descriptions, Typography, CollapseProps, Collapse } from 'antd';
import { observer } from 'mobx-react-lite';
import { DescriptionsItemType } from 'antd/es/descriptions';
import productStore from '../../store/product-store';
import styles from './TechSpecs.module.css';
import { Brakes, Components, Drivetrain, Frameset, Wheels } from '../../types/product-response';
import { toTitleCase } from '../../utils/string-functions';

const { Title } = Typography;

function getCollapseItems<T>(items: T, key: string, label: string) {
  let childItems;
  if (Array.isArray(items)) {
    childItems = items;
  } else if (typeof items === 'object' && items !== null) {
    childItems = Object.keys(items).map((item, index) => {
      const field = item as keyof T;
      return {
        key: String(index + 1),
        label: toTitleCase(item),
        children: items[field],
      };
    });
  }

  return {
    key,
    label,
    children: (
      <Descriptions
        size="small"
        bordered
        title=""
        column={1}
        items={childItems as DescriptionsItemType[]}
        labelStyle={{ color: 'var(--color-text)', border: 'none', paddingLeft: '0.5rem' }}
      />
    ),
  };
}

function TechSpecs() {
  const weightItems = [
    {
      key: '1',
      label: 'Weight Limit',
      children: `${productStore.product?.weight.toString()} kg`,
    },
  ];
  const notesItems = [
    {
      key: '1',
      label: 'Pricing & Specifications',
      children: productStore.product?.notes.specifications,
    },
  ];
  const items: CollapseProps['items'] = [
    getCollapseItems<Frameset>(productStore.product!.specs!.frameset as Frameset, '1', 'FRAMESET'),
    getCollapseItems<Drivetrain>(productStore.product!.specs!.drivetrain as Drivetrain, '2', 'DRIVETRAIN'),
    getCollapseItems<Brakes>(productStore.product!.specs!.brakes as Brakes, '3', 'BRAKES'),
    getCollapseItems<Components>(productStore.product!.specs!.components as Components, '4', 'COMPONENTS'),
    getCollapseItems<Wheels>(productStore.product!.specs!.wheels as Wheels, '5', 'WHEELS'),
    getCollapseItems(weightItems, '6', 'WEIGHT'),
    getCollapseItems(notesItems, '7', 'NOTES'),
  ];

  return (
    <div>
      <Title level={2}>TECH SPECS</Title>
      <Divider style={{ marginTop: 0 }} />
      <div className={styles.container}>
        <div className={styles['description-table']}>
          <Collapse items={items} style={{ fontFamily: 'Futura', fontWeight: 600, fontSize: '1.5rem' }} />
        </div>
      </div>
    </div>
  );
}

const observableTechSpecs = observer(TechSpecs);
export default observableTechSpecs;
