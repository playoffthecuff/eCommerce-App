import { Typography } from 'antd';
import { LogoIcon } from '../../CustomIcons/CustomIcons';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      <div className={styles.header}>
        <LogoIcon className={styles.logo} />
        <Typography.Title level={5} className={styles.title}>
          Cycling Dependency
        </Typography.Title>
      </div>
      <Typography.Text className={styles.text}>
        Here at Cycling Dependency it&apos;s all about cycling. We share the same experiences that you do on bike pass,
        highway and off-road and these experiences push us to make the best gear possible for our worldwide family of
        cyclists.
      </Typography.Text>
    </>
  );
}
