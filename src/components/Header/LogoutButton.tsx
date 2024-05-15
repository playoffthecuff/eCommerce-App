import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

export default function LogoutButton() {
  return (
    <Button type="link" icon={<LogoutOutlined />}>
      Logout
    </Button>
  );
}
