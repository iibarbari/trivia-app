import classNames from 'classnames';
import he from 'he';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Button, Container, Layout } from '../../components';
import { QuestionsContext } from '../../contexts';
import styles from './Game.module.css';

const Game: NextPage = () => {
  const router = useRouter();

  const {
    currentQuestion, updateAnswers, isLoading, count,
  } = useContext(QuestionsContext);

  useEffect(() => {
    if (!isLoading && currentQuestion === undefined) router.push('/score');
  }, [currentQuestion, isLoading, router]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  return currentQuestion === undefined ? null : (
    <Layout className={styles.game}>
      <section className={styles.question}>
        <Container className={styles.wrapper}>
          <p className={classNames(styles.category, 'text-shadow')}>{currentQuestion.category}</p>

          <p className={classNames(styles.questionText, 'cursive')}>
            {`${count + 1}. ${he.decode(currentQuestion.question)}`}
          </p>
        </Container>
      </section>

      <section className={styles.answer}>
        <Container className={styles.buttons}>
          <Button onClick={() => updateAnswers('True')} type="button">True</Button>

          <Button onClick={() => updateAnswers('False')} type="button">False</Button>
        </Container>
      </section>
    </Layout>
  );
};

export default Game;
