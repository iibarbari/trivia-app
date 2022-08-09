import classNames from 'classnames';
import React from 'react';
import styles from './Container.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export default function Container({ className, children, ...props }: Props) {
  return (
    <div {...props} className={classNames(styles.container, className)}>{children}</div>
  );
}
