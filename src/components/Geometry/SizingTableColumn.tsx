import { TableProps, Tooltip } from 'antd';

type SizingDataType = {
  key: string;
  name: string;
  small: number;
  medium: number;
  large: number;
};

export const sizingTableColumn: TableProps<SizingDataType>['columns'] = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <Tooltip title={`for riders 5'4" to 5'8`}>Small (50 cm)</Tooltip>,
    dataIndex: 'small',
    key: 'small',
  },
  {
    title: <Tooltip title={`for riders 5'8" to 5'10`}>Medium (53 cm)</Tooltip>,
    dataIndex: 'medium',
    key: 'medium',
  },
  {
    title: <Tooltip title={`for riders 5'10" to 6'2"`}>Large (56 cm)</Tooltip>,
    dataIndex: 'large',
    key: 'large',
  },
];
