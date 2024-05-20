import { Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import pageLogo from '../../assets/images/monkeys.svg';

import styles from './ErrorPage.module.css';

const { Title, Text, Link } = Typography;

function ErrorPage() {
  return (
    <div id="error-page" className={styles.error}>
      <Title>Not Found</Title>
      <Paragraph>
        <Text className={styles.text}>
          There is plenty to buy on our Website, but nothing here. Head to our{' '}
          <Link href="#/main" className={styles.text}>
            [main page]
          </Link>{' '}
          and begin your shopping!
        </Text>
      </Paragraph>
      <div className={styles['error-image-wrapper']}>
        <img src={pageLogo} alt="Monkeys Icon" />
      </div>
    </div>
  );
}

export default ErrorPage;
