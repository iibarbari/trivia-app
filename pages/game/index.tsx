import classNames from 'classnames';
import he from 'he';
import type { NextPage } from 'next';
import { useContext } from 'react';
import { Button, Container, Layout } from '../../components';
import { QuestionsContext } from '../../contexts';
import styles from './Game.module.css';

const Game: NextPage = () => {
  const { currentQuestion, updateAnswers, isLoading, count } = useContext(QuestionsContext);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (currentQuestion === undefined) {
    return null;
  }

  return (
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
          <Button type="button" size="lg" onClick={() => updateAnswers('True')}>True</Button>

          <Button type="button" size="lg" onClick={() => updateAnswers('False')}>False</Button>
        </Container>
      </section>
    </Layout>
  );
};

export default Game;
