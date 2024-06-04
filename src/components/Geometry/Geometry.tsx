import { Divider, Typography, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import productStore from '../../store/product-store';
import styles from './Geometry.module.css';
import { sizingTableColumn as sizingTableColumns } from './SizingTableColumn';
import drawing from '../../assets/images/geometry.svg';
import { toTitleCaseWithSpaces } from '../../utils/string-functions';
import { Sizing } from '../../types/product-response';

const { Title } = Typography;

type SizingDataType = {
  key: string;
  name: string;
  small: number;
  medium: number;
  large: number;
};

function getSizingData(): SizingDataType[] | undefined {
  const sizingData = productStore.product?.sizing;
  if (!sizingData) return undefined;

  return Object.keys(sizingData).map((item, index) => {
    const key = item as keyof Sizing;
    const size = sizingData[key];
    return {
      key: String(index + 1),
      name: toTitleCaseWithSpaces(item),
      small: size.small,
      medium: size.medium,
      large: size.large,
    };
  });
}

function Geometry() {
  const scrollToTarget =
    1550 -
    window.innerWidth ** 0.5 +
    (window.innerWidth > 1023 ? 0 : 1250 - window.innerWidth) +
    (window.innerWidth > 727 ? 0 : 0); // remove magic next sprint
  const [bicyclePosition, setBicyclePosition] = useState(-scrollToTarget);
  const [tablePosition, setTablePosition] = useState(scrollToTarget);
  useEffect(() => {
    const handleScroll = () => {
      setBicyclePosition(bicyclePosition < 0 ? -scrollToTarget + window.scrollY : 0);
      setTablePosition(tablePosition > 0 ? scrollToTarget - window.scrollY : 0);
      console.log(bicyclePosition, tablePosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bicyclePosition, scrollToTarget, tablePosition]);
  return (
    <div>
      <Title level={2}>SIZING & GEOMETRY</Title>
      <Divider style={{ marginTop: 0 }} />
      <div className={classNames(styles.container)}>
        <div className={styles.drawing} style={{ transform: `translateX(${bicyclePosition}px` }}>
          <img className={styles.image} alt="drawing" src={drawing} />
        </div>
        <Table
          className={styles['geometry-table']}
          columns={sizingTableColumns}
          dataSource={getSizingData()}
          size="small"
          pagination={false}
          style={{ transform: `translateX(${tablePosition}px` }}
        />
      </div>
    </div>
  );
}

const observableGeometry = observer(Geometry);
export default observableGeometry;
