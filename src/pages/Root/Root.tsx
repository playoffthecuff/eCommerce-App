import { Outlet } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Ticker from '../../components/Ticker/Ticker';
import styles from './Root.module.css';
import PromotionTab from '../../components/PromotionTab/PromotionTab';

const { Content } = Layout;

const PROMO_WORD = 'SNIZHAY!';

function Root() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tickerRepeat, setTickerRepeat] = useState(Math.ceil(window.innerWidth / 896));
  const [tickerAnimationDuration, setTickerAnimationDuration] = useState(`${tickerRepeat * 16}s`);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setTickerRepeat(Math.ceil(windowWidth / 896));
    setTickerAnimationDuration(`${tickerRepeat * 16}s`);
  }, [windowWidth]);

  return (
    <>
      <PromotionTab className={styles.promo} />
      <Layout className={styles.layout}>
        <div className={styles['ticker-wrapper']}>
          <div className={styles.ticker}>
            <div className={styles['neo-wrapper']}>
              <span className={styles.neo}>20% OFF</span>
              <span className={styles.neo}>ON ALL</span>
            </div>
            <Ticker
              repeat={tickerRepeat}
              stoppable
              duration={tickerAnimationDuration}
              content={
                <Typography.Title level={4} copyable style={{ padding: '1rem' }}>
                  {PROMO_WORD}
                </Typography.Title>
              }
            />
          </div>
        </div>
        <Header />
        <Content className={styles.main}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default Root;
