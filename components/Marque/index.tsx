import classNames from 'classnames';
import React from 'react';
import styles from './Marque.module.css';

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, {
  text: string
}>

export default function Marque({ className, text, ...props }: Props) {
  return (
    <div {...props} className={classNames(styles.marque, className)}>
      <div className={classNames('text-shadow', styles.line)}>
        {[...new Array(50).fill(text)].join('   ')}
      </div>
    </div>
  );
}
