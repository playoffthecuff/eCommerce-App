import { LeftOutlined, HomeOutlined } from '@ant-design/icons';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';

export default function NoWayResult() {
  const navigate = useNavigate();
  return (
    <Result
      status="info"
      title="It seems you are lost?"
      subTitle="You can go back or start over"
      extra={[
        <CustomButton
          variety="common"
          icon={<LeftOutlined />}
          key="back"
          onClick={() => navigate(-1)}
          htmlType="button"
          style={{ width: '136px', display: 'inline-block', marginRight: '2rem' }}
        >
          GO BACK
        </CustomButton>,
        <CustomButton
          variety="common"
          icon={<HomeOutlined style={{ fontWeight: 600 }} />}
          key="buy"
          onClick={() => navigate('/main')}
          htmlType="button"
          style={{ width: '136px', display: 'inline-block' }}
        >
          MAIN PAGE
        </CustomButton>,
      ]}
    />
  );
}
