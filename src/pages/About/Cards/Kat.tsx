import { Avatar, Card } from 'antd';
import { WomanOutlined, GithubOutlined, PieChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import classNames from 'classnames';
import { FunctionIcon } from '../../../components/CustomIcons/CustomIcons';
import photo from '../../../assets/images/photoKate.jpg';
import styles from './Card.module.css';
import TypedText from '../../../components/TypedText/TypedText';
import GrowingList from '../../../components/GrowingList/GrowingList';

const tabList = [
  {
    key: 'Bio',
    label: 'Bio',
    icon: <WomanOutlined />,
  },
  {
    key: 'Contribution',
    label: 'Contribution',
    icon: <PieChartOutlined />,
  },
];

const contentList: Record<string, React.ReactNode> = {
  Bio: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Logician
      </p>
      <p className={styles['team-description']}>
        <TypedText
          delay={30}
          text="An engineer by training, I started learning programming 1.5 years ago. I like solving problems and learning something new. Attentive to details and always remain calm and balanced."
        />
      </p>
    </>
  ),
  Contribution: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Logician
      </p>
      <div className={styles['team-description']}>
        <ul className={styles['contribution-list']}>
          <GrowingList
            items={[
              'User profile page',
              'Product cart',
              'User login',
              'Initial project settings',
              'User registration',
              'Working with photos',
              'User address management',
              'Breadcrumbs',
              'Promo code',
            ]}
          />
        </ul>
      </div>
    </>
  ),
};

export default function KatCard() {
  const [activeTabKey, setActiveTabKey] = useState<string>('Contribution');

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      className={styles['team-card']}
      classNames={{ body: styles['team-card-body'] }}
      tabList={tabList}
      hoverable
      type="inner"
      activeTabKey={activeTabKey}
      tabBarExtraContent={
        <a href="https://github.com/kat2709" aria-label="Katerina Github" target="blank">
          <GithubOutlined className={styles['team-gh']} />
        </a>
      }
      onTabChange={onTabChange}
    >
      <Card.Meta
        className={classNames(styles['team-card-meta'], styles.reverse)}
        avatar={<Avatar src={photo} className={styles['team-avatar']} />}
        title="1: 'Katerina Rubchenko'"
        description={contentList[activeTabKey]}
      />
    </Card>
  );
}
