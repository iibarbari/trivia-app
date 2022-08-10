import classNames from 'classnames';
import type { NextPage } from 'next';
import Link from 'next/link';
import {
  Button, Container, Layout, Marque,
} from '../components';
import styles from './Home.module.css';

const Home: NextPage = () => (
  <Layout className={styles.home}>
    <div className={styles.section}>
      <Marque className={styles.marquee} text="Can you score 100%?" />

      <Container className={styles.wrapper}>
        <h1 className={classNames(styles.title, 'cursive')}>Welcome to the Trivia Challenge!</h1>

        <p className={styles.subTitle}>
          You will be presented with 10
          <b>True</b>
          {' '}
          or
          <b>False</b>
          {' '}
          questions.
        </p>
      </Container>
    </div>

    <div className={styles.section}>
      <Link href="/game" passHref>
        <Button size="lg">Begin?</Button>
      </Link>
    </div>
  </Layout>
);

export default Home;
