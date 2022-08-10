import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';
import { Container, Layout, Scoreboard } from '../../components';
import Button from '../../components/Button';
import { QuestionsContext } from '../../contexts';
import styles from './Score.module.css';

const Score: NextPage = () => {
  const router = useRouter();
  const { questions, resetGame } = useContext(QuestionsContext);
  const score = useMemo<number>(
    () => questions.filter(({ answer, correctAnswer }) => answer === correctAnswer).length,
    [questions],
  );

  return (
    <Layout className={styles.score}>
      <Container className={styles.section}>
        <p className={classNames('cursive', styles.scoreboard)}>{`Your score is ${score} / 10`}</p>
      </Container>

      <Container className={styles.section}>
        <Scoreboard />
      </Container>

      <Container className={classNames(styles.section, styles.cta)}>
        <Button
          onClick={async () => {
            resetGame();

            await router.push('/');
          }}
          type="button"
        >
          Play Again?
        </Button>
      </Container>
    </Layout>
  );
};
export default Score;
