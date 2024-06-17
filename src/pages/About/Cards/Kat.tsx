import { Avatar, Card } from 'antd';
import { WomanOutlined, GithubOutlined, PieChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FunctionIcon } from '../../../components/CustomIcons/CustomIcons';
import katImg from '../../../assets/images/good-morning.gif';
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit quae, temporibus ad impedit numquam laborum
        nulla quia provident alias pariatur eum maxime delectus mollitia deserunt architecto aperiam ullam, reiciendis
        iure! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit quae, temporibus ad impedit numquam
        laborum nulla quia provident alias pariatur eum maxime delectus mollitia deserunt architecto aperiam ullam,
        reiciendis iure!
      </p>
    </>
  ),
  Contribution: (
    <>
      <p className={styles['team-role']}>
        <FunctionIcon /> Logician
      </p>
      <p className={styles['team-description']}>
        <ul>
          <li>to</li>
          <li>sye</li>
          <li>pyatoe</li>
          <li>desyatoe</li>
        </ul>
      </p>
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
        avatar={<Avatar src={katImg} className={styles['team-avatar']} />}
        title="1: 'Katerina Rubchenko'"
        description={contentList[activeTabKey]}
      />
    </Card>
  );
}
