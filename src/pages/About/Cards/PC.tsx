import { Avatar, Card } from 'antd';
import { ManOutlined, GithubOutlined, PieChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FunctionIcon } from '../../../components/CustomIcons/CustomIcons';
import pcImg from '../../../assets/images/pc.jpg';
import styles from './Card.module.css';

const tabList = [
  {
    key: 'Bio',
    label: 'Bio',
    icon: <ManOutlined />,
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
        <FunctionIcon /> Enthusiast
      </p>
      <p className={styles['team-description']}>
        Energy specialist with a background in &quot;Management and Informatics in Technical Systems&quot;, focusing on
        automating technological processes. Participated in the development of a product line for high voltage power
        distribution and implemented many projects using it. I like to develop interfaces, and also music - I play the
        guitar and drums.
      </p>
    </>
  ),
  Contribution: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Enthusiast
      </p>
      <div className={styles['team-description']}>
        <ul>
          <li>Data scraping & DB filling</li>
          <li>Admin page</li>
          <li>Header & Footer</li>
          <li>User login</li>
          <li>Project management</li>
          <li>Product page</li>
          <li>Frontend CI/CD</li>
          <li>Themes</li>
          <li>About page</li>
        </ul>
      </div>
    </>
  ),
};

export default function PCCard() {
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
        <a href="https://github.com/playoffthecuff" aria-label="Evgenii Github" target="blank">
          <GithubOutlined className={styles['team-gh']} />
        </a>
      }
      onTabChange={onTabChange}
    >
      <Card.Meta
        className={styles['team-card-meta']}
        avatar={<Avatar src={pcImg} className={styles['team-avatar']} />}
        title="2: 'Evgenii Artemenko'"
        description={contentList[activeTabKey]}
      />
    </Card>
  );
}
