import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

export default function LoginButton() {
  return (
    <Button type="link" href="#/login" icon={<LoginOutlined />}>
      Sign In
    </Button>
  );
}
