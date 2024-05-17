import { Layout, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import styles from './Footer.module.css';

import schoolLogo from '../../assets/images/school-logo.svg';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12} md={8} lg={6}>
          <a href="https://rs.school/" aria-label="RS School" target="_blank" rel="noreferrer">
            <img src={schoolLogo} alt="RS School Logo" style={{ width: '150px' }} />
          </a>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <a
                href="https://github.com/kat2709"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile kat2709"
                className={styles['footer-link']}
              >
                <GithubOutlined style={{ fontSize: '24px' }} />
                <span>kat2709</span>
              </a>
            </Col>
            <Col>
              <a
                href="https://github.com/playoffthecuff"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile playoffthecuff"
                className={styles['footer-link']}
              >
                <GithubOutlined style={{ fontSize: '24px' }} />
                <span>playoffthecuff</span>
              </a>
            </Col>
            <Col>
              <a
                href="https://github.com/hrybach-oleksiy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile hrybach-oleksiy"
                className={styles['footer-link']}
              >
                <GithubOutlined style={{ fontSize: '24px' }} />
                <span>hrybach-oleksiy</span>
              </a>
            </Col>
          </Row>
        </Col>
        <Col className={styles['footer-copyright']} xs={24} sm={24} md={8} lg={6} style={{ textAlign: 'center' }}>
          <p className={styles['footer-copyright-text']}>&copy; {new Date().getFullYear()}</p>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
