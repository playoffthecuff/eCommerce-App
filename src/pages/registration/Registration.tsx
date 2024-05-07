import { Link } from 'react-router-dom';
import { Space } from 'antd';

function Registration() {
  return (
    <>
      <div>Registration</div>
      <Space>
        <Link to="/login">Submit</Link>
      </Space>
    </>
  );
}

export default Registration;
