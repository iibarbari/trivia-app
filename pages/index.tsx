import classNames from 'classnames';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import {
  Button, Container, Layout, Marque,
} from '../components';
import { QuestionsContext } from '../contexts';
import styles from './Home.module.css';

const Home: NextPage = () => {
  const { hasError } = useContext(QuestionsContext);

  return (
    <Layout className={styles.home}>
      <div className={styles.section}>
        <Marque className={styles.marquee} text="Can you score 100%?" />

        <Container className={styles.wrapper}>
          <h1 className={classNames(styles.title, 'cursive')}>Welcome to the Trivia Challenge!</h1>

          {hasError ? (
            <p className={styles.subTitle}>
              Houston, we have a problem about API. Please hang up or try your call again.
            </p>
          ) : (
            <p className={styles.subTitle}>
              You will be presented with 10
              <b> True</b>
              {' '}
              or
              <b> False</b>
              {' '}
              questions.
            </p>
          )}
        </Container>
      </div>

      {!hasError && (
        <div className={styles.section}>
          <Link href="/game" passHref>
            <Button>Begin?</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Home;
