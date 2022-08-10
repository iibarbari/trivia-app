import classNames from 'classnames';
import React, { useContext } from 'react';
import he from 'he';
import { QuestionsContext } from '../../contexts';
import { MinusIcon, PlusIcon } from '../../icons';
import styles from './Scoreboard.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export default function Scoreboard({ children, ...props }: Props) {
  const { questions } = useContext(QuestionsContext);

  return (
    <div {...props} className={styles.scoreboard}>
      <table className={styles.table}>
        <tbody>
          {questions.map((question) => (
            <tr
              className={classNames(
                styles.row,
                question.answer === question.correctAnswer ? styles.right : styles.wrong,
              )}
              key={question.question}
            >
              <td className={classNames(styles.cell, styles.fixed)}>
                {question.answer === question.correctAnswer ? <PlusIcon />
                  : <MinusIcon />}
              </td>

              <td className={styles.cell}>{he.decode(question.question)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
