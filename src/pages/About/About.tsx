import classNames from 'classnames';
import { AudioOutlined, DiscordOutlined, CommentOutlined, GithubOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import {
  AgileIcon,
  JiraIcon,
  MentorIcon,
  RSSoldIcon,
  RetroIcon,
  ScrumIcon,
  ThreeDudesGrowsIcon,
} from '../../components/CustomIcons/CustomIcons';
import FadedText from '../../components/FadedText/FadedText';
import HackerText from '../../components/HackerText/HackerText';
import LadderHeading from '../../components/LadderHeading/LadderHeading';
import Neuro from '../../components/Neuro/Neuro';
import styles from './About.module.css';
import handImg from '../../assets/images/hand.png';
import KatCard from './Cards/Kat';
import OHCard from './Cards/OH';
import PCCard from './Cards/PC';

export default function AboutPage() {
  return (
    <>
      <div className={styles.hero}>
        <Neuro />
        <div className={styles['hero-content']}>
          <LadderHeading text="p0grammers" />
          <FadedText text="team" animationSpeed={1.6} startDelay={1.25} className={styles.flip} />
        </div>
        <div className={styles['logo-wrapper']}>
          <a className={styles['rss-logo']} href="https://rs.school/" aria-label="Best School Ever" target="blank">
            <RSSoldIcon />
          </a>
        </div>
      </div>
      <div className="container">
        <div className={styles['welcome-block']}>
          <HackerText className={styles.heading} text="Welcome to the Cycling Dependency" />
          <div>
            <img className={styles.welcomeImg} src={handImg} alt="hand" />
            <div className={styles['welcome-text']}>
              This website was developed as part of the educational project of the{' '}
              <a href="https://rs.school/" target="blank">
                Rolling Scopes
              </a>{' '}
              school by a group of non&#8209;random people - professionals in their field. Perhaps you can buy undefiled
              bicycles and accessories here, but perhaps not. In any case, we welcome your visit and hope you enjoy your
              stay.
            </div>
          </div>
        </div>
        <div className={styles['team-block']}>
          <div className={classNames(styles.heading, styles['mono-font'])}>const team = [</div>
          <div className={styles['team-card-wrapper']}>
            <OHCard />
            <KatCard />
            <PCCard />
          </div>
          <div className={classNames(styles.heading, styles['mono-font'])}>];</div>
        </div>
        <div className={styles['team-work']}>
          <p className={styles.heading} style={{ marginBlockEnd: '0.5rem' }}>
            Teamwork methods:
          </p>
          <Card
            className={styles['team-work-entry']}
            title={
              <>
                <MentorIcon style={{ fontSize: '2.8rem' }} />
                <Tag className={styles.tag} color="#cd201f">
                  Mentorship
                </Tag>
              </>
            }
          >
            Regular calls with mentors to solve the most difficult problems.
          </Card>
          <Card
            className={styles['team-work-entry']}
            title={
              <>
                <Tag icon={<AgileIcon />} className={styles.tag} color="#1C495C">
                  Agile
                </Tag>
                <Tag icon={<JiraIcon />} className={styles.tag} color="#357DE8">
                  Jira
                </Tag>
              </>
            }
          >
            Dividing tasks into Kanban cards with grouping into sprint boards.
          </Card>
          <Card
            className={styles['team-work-entry']}
            title={
              <>
                <ThreeDudesGrowsIcon style={{ fontSize: '2.4rem', marginRight: '0.25rem' }} />
                <Tag className={styles.tag} color="#3B5999">
                  Exchange
                </Tag>
                <Tag icon={<AudioOutlined />} className={styles.tag} color="#AEB910">
                  Daily
                </Tag>
              </>
            }
          >
            Daily meetings to discuss pressing issues.
          </Card>
          <Card
            className={styles['team-work-entry']}
            title={
              <>
                <Tag icon={<RetroIcon />} className={styles.tag} color="#42D010">
                  Retro
                </Tag>
                <Tag icon={<ScrumIcon />} className={styles.tag} color="#5081BE">
                  Scrum
                </Tag>
              </>
            }
          >
            Conducting post-sprint retrospectives.
          </Card>
          <Card
            className={styles['team-work-entry']}
            title={
              <>
                <Tag icon={<DiscordOutlined />} className={styles.tag} color="#5865F2">
                  Discord
                </Tag>
                <Tag icon={<CommentOutlined />} className={styles.tag} color="#6C6C6C">
                  Chat
                </Tag>
              </>
            }
          >
            Free communication on discord with approximately 100,500 lines of text.
          </Card>
          <Card
            className={styles['team-work-entry']}
            title={
              <Tag icon={<GithubOutlined />} className={styles.tag} color="#431D57">
                GitHub
              </Tag>
            }
          >
            Mutual and mentoring code reviews of pull requests on GitHub.
          </Card>
        </div>
      </div>
    </>
  );
}
