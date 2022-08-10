import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';
import { Container, Layout, Scoreboard } from '../../components';
import Button from '../../components/Button';
import { QuestionsContext } from '../../contexts';
import styles from './Score.module.css';

const Score: NextPage = () => {
  const router = useRouter();
  const { questions, resetGame, currentQuestion } = useContext(QuestionsContext);
  const score = useMemo<number>(
    () => questions.filter(({ answer, correctAnswer }) => answer === correctAnswer).length,
    [questions],
  );

  useEffect(() => {
    if (currentQuestion !== undefined) {
      router.push('/');
    }
  }, [currentQuestion, router]);

  return (
    <Layout className={styles.score}>
      <Container className={styles.section}>
        <p className={classNames('text-shadow', styles.scoreboard)}>{`Your score is ${score} / 10`}</p>
      </Container>

      <Container className={styles.section}>
        <Scoreboard />
      </Container>

      <Container className={classNames(styles.section, styles.cta)}>
        <Button
          onClick={() => resetGame()}
          size="lg"
          type="button"
        >
          Play Again?
        </Button>
      </Container>
    </Layout>
  );
};
export default Score;
