import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import userStore from '../../store/user-store';

export default function LogoutButton() {
  const onClick = () => {
    userStore.logout();
  };

  return (
    <Button type="link" icon={<LogoutOutlined />} onClick={onClick}>
      Logout
    </Button>
  );
}
