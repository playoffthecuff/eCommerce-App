import { Typography } from 'antd';
import styles from './LinksIconList.module.css';
import { AntIcon, MobxIcon, ReactIcon } from '../../CustomIcons/CustomIcons';

export default function Frontend() {
  return (
    <div className={styles.wrapper}>
      <Typography.Text className={styles.title}>Frontend:</Typography.Text>
      <ul className={styles.content}>
        <a href="https://react.dev" target="blank">
          <ReactIcon />
          React
        </a>
        <a href="https://mobx.js.org" target="blank">
          <MobxIcon />
          Mobx
        </a>
        <a href="https://ant.design" target="blank">
          <AntIcon />
          Ant Design
        </a>
      </ul>
    </div>
  );
}
