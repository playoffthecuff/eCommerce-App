import { Space, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import styles from './ErrorPage.module.css';

const { Title, Text, Link } = Typography;

function ErrorPage() {
  return (
    <div className="wrapper">
      <div id="error-page" className={styles.error}>
        <Title>Not Found</Title>
        <Paragraph>
          <Space>
            <Text>There is plenty to buy on our Website, but nothing here. Head to our</Text>
            <Link href="#/main">[main page]</Link>
            <Text>and begin your shopping!</Text>
          </Space>
        </Paragraph>
      </div>
    </div>
  );
}

export default ErrorPage;
