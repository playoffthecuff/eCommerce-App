import { Avatar, Card } from 'antd';
import { ManOutlined, GithubOutlined, PieChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FunctionIcon } from '../../../components/CustomIcons/CustomIcons';
import pcImg from '../../../assets/images/pc.jpg';
import styles from './Card.module.css';
import TypedText from '../../../components/TypedText/TypedText';
import GrowingList from '../../../components/GrowingList/GrowingList';

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
        <TypedText
          delay={30}
          text='Energy specialist with a background in "Management and Informatics in Technical Systems", focusing on automating technological processes. Participated in the development of a product line for high voltage power distribution. I like to develop interfaces.'
        />
      </p>
    </>
  ),
  Contribution: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Enthusiast
      </p>
      <div className={styles['team-description']}>
        <ul className={styles['contribution-list']}>
          <GrowingList
            items={[
              'Data scraping & DB filling',
              'Admin page',
              'Header & Footer',
              'User login',
              'Project management',
              'Product page',
              'Frontend CI/CD',
              'Themes',
              'About page',
            ]}
          />
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
