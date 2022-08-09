import type { NextPage } from 'next';
import Link from 'next/link';
import { Container, Layout, Scoreboard } from '../../components';
import Button from '../../components/Button';
import styles from './Score.module.css';

const Score: NextPage = () => {
  return (
    <Layout className={styles.score}>
      <Container className={styles.section}>
        <Scoreboard />
      </Container>

      <Container className={styles.section}>
        <Link href="/" passHref>
          <Button size="lg">Play Again?</Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default Score;
