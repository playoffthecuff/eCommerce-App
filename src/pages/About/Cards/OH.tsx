import { Avatar, Card } from 'antd';
import { ManOutlined, GithubOutlined, PieChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FunctionIcon } from '../../../components/CustomIcons/CustomIcons';
import ohImg from '../../../assets/images/hrybach-avatar.png';
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
        <FunctionIcon /> Explorer
      </p>
      <p className={styles['team-description']}>
        <TypedText
          delay={30}
          text="Working in tourism, I have a passion for travel and learning. Since the summer of 2022, I have been exploring programming, enjoying the challenge it presents. I find great satisfaction in overcoming obstacles and acquiring new skills."
        />
      </p>
    </>
  ),
  Contribution: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Explorer
      </p>
      <div className={styles['team-description']}>
        <ul className={styles['contribution-list']}>
          <GrowingList
            items={[
              'Main page',
              'Backend application core',
              'Sorting and filtering products',
              'Routing',
              'Catalog page',
              'Backend CI/CD',
              'Products search',
              'Product cart',
              'Swagger docs',
            ]}
          />
        </ul>
      </div>
    </>
  ),
};

export default function OHCard() {
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
        <a href="https://github.com/hrybach-oleksiy" aria-label="Oleksiy Github" target="blank">
          <GithubOutlined className={styles['team-gh']} />
        </a>
      }
      onTabChange={onTabChange}
    >
      <Card.Meta
        className={styles['team-card-meta']}
        avatar={<Avatar src={ohImg} className={styles['team-avatar']} />}
        title="0: 'Oleksiy Hrybach'"
        description={contentList[activeTabKey]}
      />
    </Card>
  );
}
