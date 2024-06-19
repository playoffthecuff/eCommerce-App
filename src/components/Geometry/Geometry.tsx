import { Divider, Typography, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import productStore from '../../store/product-store';
import styles from './Geometry.module.css';
import { sizingTableColumn as sizingTableColumns } from './SizingTableColumn';
import drawing from '../../assets/images/geometry.svg';
import { toTitleCaseWithSpaces } from '../../utils/string-functions';
import { Sizing } from '../../types/product-response';

const { Title } = Typography;

const CONTAINER_OFFSET = 176;

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
  const bicycleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [startOffset, setStartOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [scrollComplete, setScrollComplete] = useState(false);

  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      const rect = table.getBoundingClientRect();
      setStartOffset(rect.top - CONTAINER_OFFSET);
      setOffset(rect.top);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollComplete) return;

      const { scrollY } = window;
      const bicycle = bicycleRef.current;
      const tableElement = tableRef.current;

      if (bicycle && tableElement) {
        const newOffset = Math.max(Math.min(startOffset - scrollY, startOffset), 0);
        setOffset(newOffset);
        if (newOffset === 0) {
          setScrollComplete(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startOffset, scrollComplete]);

  useEffect(() => {
    const bicycleElement = bicycleRef.current;
    const tableElement = tableRef.current;

    if (bicycleElement && tableElement) {
      bicycleElement.style.transform = `translateX(-${offset}px)`;
      tableElement.style.transform = `translateX(${offset}px)`;
    }
  }, [offset]);

  return (
    <div>
      <Title level={2}>SIZING & GEOMETRY</Title>
      <Divider style={{ marginTop: 0 }} />
      <div className={classNames(styles.container)}>
        <div ref={bicycleRef} className={styles.drawing}>
          <img className={styles.image} alt="drawing" src={drawing} />
        </div>
        <div ref={tableRef}>
          <Table
            className={styles['geometry-table']}
            columns={sizingTableColumns}
            dataSource={getSizingData()}
            size="small"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

const observableGeometry = observer(Geometry);
export default observableGeometry;
