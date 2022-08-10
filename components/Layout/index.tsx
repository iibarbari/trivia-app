import Head from 'next/head';
import React from 'react';
import styles from './Layout.module.css';
import classNames from 'classnames';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export default function Layout({ className, children, ...props }: Props) {
  return (
    <div {...props} className={styles.layout}>
      <Head>
        <title>Trivia App</title>
        <meta name="description" content="A trivia game you can enjoy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classNames(styles.main, className)}>
        {children}
      </main>
    </div>
  );
}
