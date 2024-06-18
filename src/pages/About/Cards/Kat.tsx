import { Avatar, Card } from 'antd';
import { WomanOutlined, GithubOutlined, PieChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FunctionIcon } from '../../../components/CustomIcons/CustomIcons';
import photo from '../../../assets/images/photoKate.jpg';
// import katImg from '../../../assets/images/good-morning.gif';
import styles from './Card.module.css';

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
        An engineer by training, I started learning programming 1.5 years ago. I like solving problems and learning
        something new. Attentive to details and always remain calm and balanced.
      </p>
    </>
  ),
  Contribution: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Logician
      </p>
      <div className={styles['team-description']}>
        <ul>
          <li>User profile page</li>
          <li>Product cart</li>
          <li>User login</li>
          <li>Initial project settings</li>
          <li>User registration</li>
          <li>Collection and processing of photos</li>
          <li>User address management</li>
          <li>Breadcrumbs</li>
          <li>Promo code</li>
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
        className={styles['team-card-meta']}
        avatar={<Avatar src={photo} className={styles['team-avatar']} />}
        title="1: 'Katerina Rubchenko'"
        description={contentList[activeTabKey]}
      />
    </Card>
  );
}
