import React, { useContext } from 'react';
import { QuestionsContext } from '../../contexts';
import he from 'he';
import styles from './Scoreboard.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export default function Scoreboard({ children, ...props }: Props) {
  const { questions } = useContext(QuestionsContext);

  return (
    <div {...props} className={styles.scoreboard}>
      <table>
        <thead>
          <tr>
            <th className={styles.cell}>Question</th>

            <th className={styles.cell}>Right Answer</th>

            <th className={styles.cell}>Your Answer</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((question, i) => (
            <tr key={i}>
              <td className={styles.cell}>{he.decode(question.question)}</td>

              <td className={styles.cell}>{question.correctAnswer}</td>

              <td className={styles.cell}>{`${question.answer} ${question.answer === question.correctAnswer ? 'up' : 'down'}`}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
