import { Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import pageLogo from '../../assets/images/monkeys.svg';

import styles from './Profile.module.css';

const { Title, Text, Link } = Typography;

export default function ProfilePage() {
  return (
    <div className="container">
      <div id="profile-page" className={styles.wrapper}>
        <Title>Page under construction</Title>
        <Paragraph>
          <Text className={styles.text}>
            Sorry! Head to our{' '}
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
    </div>
  );
}
