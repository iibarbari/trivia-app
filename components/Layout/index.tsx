import Head from 'next/head';
import React from 'react';
import styles from './Layout.module.css';
import classNames from 'classnames';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export default function Layout({ className, children, ...props }: Props) {
  return (
    <div {...props} className={classNames(styles.layout, className)}>
      <Head>
        <title>Trivia App</title>
        <meta name="description" content="A trivia game you can enjoy" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
