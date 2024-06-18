import { Typography } from 'antd';
import styles from './LinksIconList.module.css';
import { ExpressIcon, MongoIcon, SwaggerIcon } from '../../CustomIcons/CustomIcons';

export default function Backend() {
  return (
    <div className={styles.wrapper}>
      <Typography.Text className={styles.title}>Backend:</Typography.Text>
      <ul className={styles.content}>
        <a href="https://expressjs.com" target="blank">
          <ExpressIcon />
          Express
        </a>
        <a href="https://www.mongodb.com" target="blank">
          <MongoIcon />
          MongoDB
        </a>
        <a href="https://swagger.io" target="blank">
          <SwaggerIcon />
          Swagger
        </a>
      </ul>
    </div>
  );
}
