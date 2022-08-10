import Head from 'next/head';
import React from 'react';
import classNames from 'classnames';
import styles from './Layout.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export default function Layout({ className, children, ...props }: Props) {
  return (
    <div {...props} className={styles.layout}>
      <Head>
        <title>Trivia App</title>
        <meta content="A trivia game you can enjoy" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={classNames(styles.main, className)}>
        {children}
      </main>
    </div>
  );
}
